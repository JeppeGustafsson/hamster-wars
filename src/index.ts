import express = require('express');
const app: express.Application = express();
const HamsterRoutes = require('../routes/hamsters');
const cors = require('cors');
const port: number = 3000;

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(HamsterRoutes);
//app.use(express.static('public'));

//Firestore config


//Endpoints
app.get('/', (req,res) => {
    res.send('Welcome home.')
})

//Start server
app.listen(port, (): void => {
    console.log('listening on port ' + port);
});

module.exports = app;