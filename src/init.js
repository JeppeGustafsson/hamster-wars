const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');
const serviceAccount = require("../service-account-credentials.json");
const data = require('../data.json');

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();


const addData = () => {
    data.forEach( i => {
        db.collection('hamsters').add(i);
    })
}
//addData();


module.exports = router;