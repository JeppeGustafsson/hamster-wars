const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.delete('/hamsters/:id', async (req, res) => {
    let id = req.params.id;
    let query = await db.collection('hamsters').where('id', '==', id);
    query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();
        })
    })
});

module.exports = router;