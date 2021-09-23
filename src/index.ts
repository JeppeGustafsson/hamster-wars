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
const AddMatch = require('../routes/addMatch.js');
const GetOneMatch = require('../routes/getOneMatch.js');
const GetMatchesForHamster = require('../routes/getMatchWinners.js');
const TopFiveWinners = require('../routes/topFiveWinners.js');
const TopFiveLosers = require('../routes/topFiveLosers.js');
const DeleteOneMatch = require('../routes/deleteOneMatch.js');
const cors = require('cors');
const port: number | string = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req,res,next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});
app.use(Init);
app.use(GetRandom);
app.use(CutestRoute);
app.use(GetMatchesForHamster);
app.use(TopFiveWinners);
app.use(TopFiveLosers);
app.use(GetAll);
app.use(GetOne);
app.use(AddOne);
app.use(UpdateOne);
app.use(DeleteOne);
app.use(DeleteOneMatch);
app.use(GetMatches);
app.use(AddMatch);
app.use(GetOneMatch);
app.use(express.static('public'));

//Start server
app.listen(port, (): void => {
    console.log('listening on port ' + port);
});

module.exports = app;