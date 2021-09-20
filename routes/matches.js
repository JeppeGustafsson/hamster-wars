const express = require('express');
const router = express.Router();
const fs = require('firebase-admin');

const db = fs.firestore();

router.get('/matches', (req, res) => {
    const matchObject = {
        winnerId: req.body.id,
        loserId: req.body.id
    }
    
    try {
        res.json('matches');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;