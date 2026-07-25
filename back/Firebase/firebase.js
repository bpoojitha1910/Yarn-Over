import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync(new URL("./Key1.json", import.meta.url))
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export default db;