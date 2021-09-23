const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');
let serviceAccount;

if (process.env.FIREBASE_KEY) {
    serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
} else {
    serviceAccount = require("../service-account-credentials.json");
}

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

module.exports = router;