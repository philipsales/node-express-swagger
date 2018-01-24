var express = require('express');
var app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = require('./../../swagger.json');
//const swaggerDocument = YAML.load(require('./../../swagger.yaml'));

var {mongoose} = require('./../db/db');

var UserController = require('./../../controllers/users/routes/UserController');


app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use('/users', UserController);
module.exports = app