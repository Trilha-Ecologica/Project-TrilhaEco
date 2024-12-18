import { openDB } from "idb";

const dbPromise = openDB("app-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("users")) {
      const userStore = db.createObjectStore("users", {
        keyPath: "id",
        autoIncrement: true,
      });
      userStore.createIndex("name", "name", { unique: true });
      userStore.createIndex("email", "email", { unique: true });
      userStore.createIndex("password", "password", { unique: false });
    }

    if (!db.objectStoreNames.contains("species")) {
      const speciesStore = db.createObjectStore("species", {
        keyPath: "id",
        autoIncrement: true,
      });
      speciesStore.createIndex("nome", "nome", { unique: true });
      speciesStore.createIndex("nomePopular", "nomePopular", { unique: false });
      speciesStore.createIndex("descricao", "descricao", { unique: false });
      speciesStore.createIndex("caracteristicas", "caracteristicas", { unique: false });
      speciesStore.createIndex("imgURL", "imgURL", { unique: false });
    }
  },
});

export default dbPromise;
