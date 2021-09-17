const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.get('/hamsters', async (req, res) => {
    let hamsters = [];
    const request = await db.collection('hamsters').get();
    request.forEach(doc => {
        hamsters.push((doc, '=>', {
            content: doc.data(), id: doc.ref.id
        }));
    });
    try {
        res.json(hamsters);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;