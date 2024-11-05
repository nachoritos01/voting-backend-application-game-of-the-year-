"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.getGOTY = exports.helloWorld = void 0;
const https_1 = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
exports.helloWorld = (0, https_1.onRequest)((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.json({
        mensaje: "hola  desde Firebase!",
    });
});
exports.getGOTY = (0, https_1.onRequest)(async (request, response) => {
    const gotyRef = db.collection("goty");
    const docsSnap = await gotyRef.get();
    const juegos = docsSnap.docs.map((doc) => doc.data());
    response.json(juegos);
});
//Express
const app = express();
app.use(cors({ origin: true }));
app.get("/goty", async (req, res) => {
    const gotyRef = db.collection("goty");
    const docsSnap = await gotyRef.get();
    const juegos = docsSnap.docs.map((doc) => doc.data());
    res.json(juegos);
});
app.post("/goty/:id", async (req, res) => {
    const id = req.params.id;
    const gameRef = db.collection("goty").doc(id);
    const gameSnap = await gameRef.get();
    if (!gameSnap.exists) {
        res.status(404).json({
            ok: false,
            mensaje: "No existe un juego con ese ID " + id,
        });
    }
    else {
        const before = gameSnap.data() || { votos: 0 };
        await gameRef.update({
            votos: before.votos + 1,
        });
        res.json({
            ok: true,
            mensaje: `Gracias por tu voto a ${before.name}`,
        });
    }
});
exports.api = (0, https_1.onRequest)(app);
//# sourceMappingURL=index.js.map