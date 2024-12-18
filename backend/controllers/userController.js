import { User } from "../config/database.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";

const secretKey = process.env.JWT_SECRET;
const SECRET_KEY = secretKey;

// Faz um SELECT * na tabela Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
};

//Realiza login
export const login = async (req, res) => {
  try {
    const { login, password } = req.body;
    
    if (!login || !password) {
      return res.status(400).json({ message: "Insira login e senha" });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: login }, { name: login }],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Credenciais inválidas." });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const tokenData = { id: user.id, username: user.name };
    const token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

// Cria um usuário na tabela Users
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userDeleted = await User.destroy({ where: { id } });

    if (userDeleted === 0) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Error ao excluir usuario", error });
  }
};

export const sendResetPasswordEmail = async (req,res) =>{
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Por favor, informe seu e-mail." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({ message: "Caso email seja valido, um codigo de redefinição será enviado." });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');
    const resetCodeExpires = Date.now() + 3600000;

    await user.update({
      resetPasswordToken: resetCode,
      resetPasswordExpires: resetCodeExpires
    });
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Redefinição de Senha",
      text: `Você solicitou a redefinição de senha. Seu código de redefinição é: ${resetCode}\nSe você não solicitou isso, ignore esta mensagem.`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Se o e-mail existir, um código de redefinição será enviado." });

  } catch(error){
    res.status(500).json({ message: "Erro", error });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { name, newPassword, confirmPassword } = req.body;

    if (!name || !newPassword) {
      return res
        .status(400)
        .json({ message: "Necessario usuario e nova senha" });
    }

    if (newPassword != confirmPassword) {
      return res.status(400).json({ message: "As senhas estão diferentes" });
    }

    const user = await User.findOne({ where: { name } });

    if (!user) {
      return res.status(400).json({ message: "Nome do usuário não encontrado" });
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await User.update({ password: hashedPassword });

    return res.status(200).json({ message: "Senha alterada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao alterar senha", error });
  }
};
