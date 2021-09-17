"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const Init = require('../src/init.js');
const CutestRoute = require('../routes/cutest.js');
const GetAll = require('../routes/getAll.js');
const GetOne = require('../routes/getOne.js');
const AddOne = require('../routes/addOne.js');
const GetRandom = require('../routes/getRandom.js');
const UpdateOne = require('../routes/updateOne.js');
const DeleteOne = require('../routes/deleteOne.js');
const cors = require('cors');
const port = 3000;
//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(Init);
app.use(CutestRoute);
app.use(GetAll);
app.use(GetOne);
app.use(AddOne);
app.use(GetRandom);
app.use(UpdateOne);
app.use(DeleteOne);
app.use(express.static('public'));
//Firestore config
//Endpoints
//Start server
app.listen(port, () => {
    console.log('listening on port ' + port);
});
module.exports = app;
