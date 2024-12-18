import { addAllUsers, getAllSpecies } from "./offline-db.js";

export async function syncUsersFromBackend() {
  try {
    const response = await fetch("https://trilha-2vfh.onrender.com/users");
    if (!response.ok) {
      throw new Error("Erro ao buscar usuários do backend");
    }

    const users = await response.json();
    await addAllUsers(users);
  } catch (error) {
    console.error("Erro ao sincronizar usuários:", error);
  }
}

export async function syncSpeciesFromBackend() {
  try {
    const response = await fetch("https://trilha-2vfh.onrender.com/species");
    if (!response.ok) {
      throw new Error("Erro ao buscar Species do backend");
    }

    const species = await response.json();
    await getAllSpecies(species);
  } catch (error) {
    console.error("Erro ao sincronizar Species:", error);
  }
}
