const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.get('/hamsters/:id', async (req, res) => {
    let hamster;
    const id = req.params.id;
    const itemToGet = db.collection('hamsters').doc(id);
    const snapshot = await itemToGet.get().then(doc => doc);

    if (!snapshot.exists) {
        res.sendStatus(404);
        return;
    } 
    
    hamster = snapshot.data();
    res.send(hamster);
});

module.exports = router;