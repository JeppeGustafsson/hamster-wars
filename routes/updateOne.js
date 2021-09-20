const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.put('/hamsters/:id', async (req, res) => {
    //Oklart vad som ska vara här
    const update = {
        wins: req.body.wins || null,
        defeats: req.body.defeats || null,
        games: req.body.games || null
    }
    const id = req.params.id;
    const dataToUpdate = await db.collection('hamsters').doc(id);

    dataToUpdate.get()
        .then(docSnapshot => {
            if (!docSnapshot.exists) {
                res.sendStatus(404);
                return;
            } else if (false) { //Kolla efter ändring 
                res.sendStatus(400);
                return;
            }
        })

    await dataToUpdate.update({
        "defeats": update.defeats, 
        "wins": update.wins, 
        "games": update.games
    });
    res.json(dataToUpdate);
});

module.exports = router;