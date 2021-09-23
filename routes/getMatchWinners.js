const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.get('/matchWinners/:id', async (req, res) => {
    const matches = [];
    const id = req.params.id;
    const itemToGet = db.collection('matches').doc(id);
    const snapshot = await itemToGet.get().then(doc => doc);
    const request = await db.collection('matches').get();
    request.forEach(doc => {
        matches.push({...doc.data(), id: doc.ref.id});
    });

    const matchesWon = matches.filter(match => {
        return match.winnerId === id;
    });

    if (matchesWon.length < 1) {
        res.sendStatus(404);
        return;
    } 
    
    res.json(matchesWon);
});

module.exports = router;