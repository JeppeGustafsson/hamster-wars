const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.get('/matches/:id', async (req, res) => {
    let match;
    const id = req.params.id;
    const itemToGet = db.collection('matches').doc(id);
    const snapshot = await itemToGet.get().then(doc => doc);

    if (!snapshot.exists) {
        res.sendStatus(404);
        return;
    } 
    
    match = snapshot.data();
    res.send({...match, id: snapshot.id});
});

module.exports = router;