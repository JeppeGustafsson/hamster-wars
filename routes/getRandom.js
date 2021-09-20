const express = require('express');
const router = express.Router({mergeParams: true});
const fs = require('firebase-admin');

const db = fs.firestore();

router.get('/hamsters/random', async (req, res) => {
    let hamsters = [];
    const request = await db.collection('hamsters').get();
    request.forEach(doc => {
        hamsters.push(doc.data());
    });
    const rand = Math.floor(Math.random() * hamsters.length);
    const randomHamster = hamsters[rand];
    
    try {
        res.json(randomHamster);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;