const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.put('/hamsters/:id', async (req, res) => {
    const body = req.body;
    const update = {
        wins: req.body.wins || null,
        defeats: req.body.defeats || null,
        games: req.body.games || null
    }
    const id = req.params.id;
    const dataToUpdate = db.collection('hamsters').doc(id);
    const snapshot = await dataToUpdate.get().then(doc => doc);
    
    if (!snapshot.exists) {
        res.sendStatus(404);
        return;
    }
    
    if (Object.keys(body).length === 0) {
        res.sendStatus(400);
        return;
    }
    
    await dataToUpdate.update({
            "defeats": update.defeats, 
            "wins": update.wins, 
            "games": update.games
        });
    res.sendStatus(200);
});

module.exports = router;