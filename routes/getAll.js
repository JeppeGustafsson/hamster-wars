const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();


const hamsters = [];

router.get('/hamsters', async (req, res) => {
    const request = await db.collection('hamsters').get();
    request.forEach(doc => {
        hamsters.push({...doc.data(), id: doc.ref.id});
    });
    try {
        res.json(hamsters);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;