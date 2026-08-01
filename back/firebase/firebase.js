import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Render Production
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Local Development
  serviceAccount = JSON.parse(
    readFileSync(new URL("./Key1.json", import.meta.url))
  );
}

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export default db;