const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');
const _ = require('lodash');

const db = fs.firestore();

router.post('/matches', async (req, res) => {
    const body = req.body;
    const matchObj = {
        loserId: body.loserId,
        winnerId: body.winnerId
    }

    if (Object.keys(body).length === 0) {
        res.sendStatus(400);
        return;
    }

    const response = await db.collection('matches').add(matchObj);
    res.json({...matchObj, id: response.id});
});

module.exports = router;