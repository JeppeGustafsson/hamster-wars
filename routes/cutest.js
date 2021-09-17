const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');
const _ = require('lodash');

const db = fs.firestore();

router.get('/hamsters/cutest', async (req, res) => {
    let hamsters = [];
    const request = await db.collection('hamsters').get();
    request.forEach(doc => {
        hamsters.push((doc, '=>', {
            content: doc.data()
        }));
    });
    const cutest = _.sortBy(hamsters, ['wins']).reverse().slice(0,10);
    try {
        res.json(cutest);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;