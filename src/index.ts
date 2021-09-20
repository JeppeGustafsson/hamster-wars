import express = require('express');
const app: express.Application = express();
const Init = require('./init.js');
const CutestRoute = require('../routes/cutest.js');
const GetAll = require('../routes/getAll.js'); 
const GetOne = require('../routes/getOne.js');
const AddOne = require('../routes/addOne.js');
const GetRandom = require('../routes/getRandom.js');
const UpdateOne = require('../routes/updateOne.js');
const DeleteOne = require('../routes/deleteOne.js');
const GetMatches = require('../routes/matches.js');
const cors = require('cors');
const port: number = 3000;

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(Init);
app.use(GetRandom);
app.use(CutestRoute);
app.use(GetAll);
app.use(GetOne);
app.use(AddOne);
app.use(UpdateOne);
app.use(DeleteOne);
app.use(GetMatches);
app.use(express.static('public'));

//Firestore config


//Endpoints


//Start server
app.listen(port, (): void => {
    console.log('listening on port ' + port);
});

module.exports = app;