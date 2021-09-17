const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.get('/hamsters/random', async (req, res) => {
    let hamsters = [];
    const rand = Math.floor(Math.random() * data.length);
    const request = await db.collection('hamsters').get();
    request.forEach(doc => {
        hamsters.push((doc, '=>', {
            content: doc.data()
        }));
    });
    try {
        res.json(hamsters[rand]);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;