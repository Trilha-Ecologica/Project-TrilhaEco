import express from "express";
import { getAllUsers, createUser, login, deleteUser, sendResetPasswordEmail} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser); 
router.post("/login", login);
router.post("/excluir/:id", deleteUser);
router.post("/sendResetPasswordEmail", sendResetPasswordEmail);

export default router;
