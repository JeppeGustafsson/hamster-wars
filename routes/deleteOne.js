const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.delete('/hamsters/:id', async (req, res) => {
    const id = req.params.id;
    const itemToDelete = db.collection('hamsters').doc(id);
    const snapshot = await itemToDelete.get().then(doc => doc);

    if (!snapshot.exists) {
        res.sendStatus(404);
        return;
    } 

    await itemToDelete.delete();
    res.sendStatus(200);
});

module.exports = router;