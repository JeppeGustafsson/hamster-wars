const express = require('express');
const router = express.Router({mergeParams: true});
const fs = require('firebase-admin');

const db = fs.firestore();

router.get('/hamsters/random', async (req, res) => {
    let hamsters = [];
    const request = await db.collection('hamsters').get();
    request.forEach(doc => {
        hamsters.push({...doc.data(), id: doc.id});
    });
    const rand = Math.floor(Math.random() * hamsters.length);
    const randomHamster = hamsters[rand];
    
    res.json(randomHamster);
});

module.exports = router;