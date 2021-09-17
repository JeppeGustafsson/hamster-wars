const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.get('/hamsters/:id', async (req, res) => {
    let hamster;
    await db.collection('hamsters').doc(req.params.id).get()
        .then(snapshot => hamster = snapshot.data())
    
    if (hamster === undefined) {
        res.sendStatus(404);
        return;
    } 
    res.send(hamster);
});

module.exports = router;