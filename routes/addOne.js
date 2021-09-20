const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');
const _ = require('lodash');

const db = fs.firestore();

router.post('/hamsters', async (req, res) => {
    const hamsterObject = {
        name: req.body.name,
        age: req.body.age,
        favFood: req.body.favFood,
        loves: req.body.loves,
        imgName: req.body.imgName,
        wins: req.body.wins,
        defeats: req.body.defeats,
        games: req.body.games
    };

    if (_.values(hamsterObject).forEach(value => value?.length <= 0 || value === undefined)) { 
        res.sendStatus(400);
        return;
    } 
    const response = await db.collection('hamsters').add(hamsterObject);
    res.json({...hamsterObject.content, id: response.id});
    res.redirect('/');
});

module.exports = router;