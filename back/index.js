const express = require('express');
const cors = require('cors');
const serverPort = process.env.PORT || 3000;
const apiRouter = require('./routes/api.routing');

// INITIALIZATIONS
const app = express();
// SETTINGS
app.set('port', serverPort);

// MIDDLEWARES
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

app.use('/api', apiRouter);

// SERVER LISTENNIG
app.listen(app.get('port'), () => {
    console.log(`Server Node READY 👻 on port: ${app.get('port')}`)
})
