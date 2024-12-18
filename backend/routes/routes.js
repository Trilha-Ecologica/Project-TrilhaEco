import express from "express";
import userRoutes from "./userRoutes.js";
import speciesRoutes from "./speciesRoutes.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/species", speciesRoutes);

export default router;