const express = require('express');
const routes = require('./routes/endpoints');

const app = express();


const port = process.env.PORT || 3000;


app.use(express.json({limit:'1mb'}));


app.use(express.static('Website'));


app.use('/',routes);


app.listen(port);




