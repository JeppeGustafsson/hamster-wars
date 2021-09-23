"use strict";
const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');
const serviceAccount = require("../service-account-credentials.json");
fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});
module.exports = router;
