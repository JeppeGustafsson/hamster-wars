const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');
const { toInteger } = require('lodash');
const _ = require('lodash');

const db = fs.firestore();

router.get('/hamsters/cutest', async (req, res) => {
    let hamsters = [];
    let results = [];
    const request = await db.collection('hamsters').get();
    request.forEach(doc => {
        hamsters.push((doc, '=>', {
            content: doc.data()
        }));
    });
    
    hamsters.forEach(hamster => {
        const result = toInteger(hamster.content.wins) - toInteger(hamster.content.defeats);
        results.push({...hamster.content, result});
    })
  
    const cutest = _.sortBy(results, ['result']).reverse().slice(0,10);
    try {
        res.json(cutest);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;