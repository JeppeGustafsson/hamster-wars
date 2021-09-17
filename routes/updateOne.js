const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.put('/hamsters/:id', async (req, res) => {
    //Oklart vad som ska vara här
    const update = {
        wins: req.body.wins,
        defeats: req.body.defeats,
        games: req.body.games
    }

    await db.collection('hamsters').doc(req.params.id).update({wins: update.wins++});
});

module.exports = router;