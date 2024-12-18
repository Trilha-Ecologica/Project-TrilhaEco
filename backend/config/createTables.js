import { sequelize } from "./database.js";
const createTables = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Tabelas criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
  }
};

export default createTables;
