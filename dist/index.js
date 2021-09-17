"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const HamsterRoutes = require('../routes/hamsters');
const cors = require('cors');
const port = 3000;
//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(HamsterRoutes);
app.use(express.static('public'));
//Firestore config
//Endpoints
//Start server
app.listen(port, () => {
    console.log('listening on port ' + port);
});
module.exports = app;
