const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

const matches = [];

router.get('/matches', async (req, res) => {
    const request = await db.collection('matches').get();
    request.forEach(doc => {
        matches.push({...doc.data(), id: doc.ref.id});
    });
    try {
        res.json(matches);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;