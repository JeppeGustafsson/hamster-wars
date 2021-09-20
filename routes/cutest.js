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
        hamsters.push((doc, '=>', {
            content: {...doc.data(), id: doc.ref.id}
        }));
    });

    hamsters.forEach(h => {
        const count = h.content.wins - h.content.defeats;
        return results.push({...h, count})
    })

    const maxVal = _.maxBy(results, 'count'); //Få med deuplicates om de existerar och kika varför den inte ses som ett object i test-script

    try {
        res.json(maxVal);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;