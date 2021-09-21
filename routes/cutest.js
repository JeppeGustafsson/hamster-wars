const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');
const _ = require('lodash');

const db = fs.firestore();

router.get('/hamsters/cutest', async (req, res) => {
    let hamsters = [];
    let results = [];

    const request = await db.collection('hamsters').get();
    request.forEach(doc => {
        hamsters.push({...doc.data(), id: doc.ref.id})
    });

    hamsters.forEach(h => {
        const count = h.wins - h.defeats;
        return results.push({...h, count: count});
    })

    const maxVal = _.maxBy(results, 'count'); 
    let allCutest = results.filter(i => i.count === maxVal.count);
    allCutest.filter(i => delete i.count);

    if (allCutest.length === 0) {
        res.sendStatus(404);
        return;
    }

    res.json(allCutest);
});

module.exports = router;