const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');
const _ = require('lodash');

const db = fs.firestore();

router.get('/winners', async (req, res) => {
    const hamsters = [];
    let results = [];

    const request = await db.collection('hamsters').get();
    request.forEach(doc => {
        hamsters.push({...doc.data(), id: doc.ref.id});
    });

    hamsters.forEach(h => {
        const count = h.wins - h.defeats;
        return results.push({...h, count: count});
    })

    const sorted = _.sortBy(results, 'count').reverse().slice(0,5); 

    sorted.filter(i => delete i.count);

    try {
        res.json(sorted);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;