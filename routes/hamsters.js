const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');
const serviceAccount = require("../service-account-credentials.json");
const data = require('../data.json');

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();

router.get('/hamsters', async (req, res) => {
    let hamsters = [];
    const request = await db.collection('hamsters').get();
    request.forEach(doc => {
        hamsters.push((doc, '=>', {
            content: doc.data()
        }));
    });
    try {
        res.json(hamsters);
    } catch (error) {
        console.log(error);
    }
});

router.get('/hamsters/random', async (req, res) => {
    let hamsters= [];
    const rand = Math.floor(Math.random() * data.length);
    const request = await db.collection('hamsters').get();
    request.forEach(doc => {
        hamsters.push((doc, '=>', {
            content: doc.data()
        }));
    });
    try {
        res.json(hamsters[rand]);
    } catch (error) {
        console.log(error);
    }
});

router.get('/hamsters/:id', async (req, res) => {
    let hamster;
    await db.collection('hamsters').doc(req.params.id).get()
        .then(snapshot => hamster = snapshot.data())
    
    if (hamster === undefined) {
        res.sendStatus(404);
        return;
    } 
    res.send(hamster);
});

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
    const response = await db.collection('hamsters').add(hamsterObject);
    res.redirect('/');
});


data.forEach(async i => {
    await db.collection('hamsters').add(i);
})


module.exports = router;