const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.delete('/hamsters/:id', async (req, res) => {
    const id = req.params.id;
    const itemToDelete = db.collection('hamsters').doc(id);

    itemToDelete.get()
    .then(docSnapshot => {
        if (!docSnapshot.exists) {
            res.sendStatus(404);
            return;
        }
    })

    await itemToDelete.delete();
    res.json(itemToDelete);
});

module.exports = router;