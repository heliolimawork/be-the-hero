const express = require('express');
const connection = require('./database/connection');
const ongController = require('./controller/OngController');
const incidentController = require('./controller/IncidentController');
const profileController = require('./controller/ProfileController');
const sessionController = require('./controller/SessionController');

const routes = express.Router();


routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/incidents', incidentController.index);
routes.post('/incidents',  incidentController.create)
routes.delete('/incidents/:id', incidentController.delete);

routes.get('/profile', profileController.index);

routes.post('/sessions',  sessionController.create);

module.exports = routes;

