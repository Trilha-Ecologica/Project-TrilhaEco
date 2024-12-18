import express from "express";
import { getSpeciesById, createSpecies, getAllSpecies} from  "../controllers/speciesController.js"

const router = express.Router();

router.get("/:id", getSpeciesById);
router.post("/", createSpecies);
router.get("/", getAllSpecies);

export default router;
