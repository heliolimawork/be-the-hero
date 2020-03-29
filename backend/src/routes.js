const express = require('express');
const { celebrate, Segments, Joi} = require('celebrate');
const ongController = require('./controller/OngController');
const incidentController = require('./controller/IncidentController');
const profileController = require('./controller/ProfileController');
const sessionController = require('./controller/SessionController');

const routes = express.Router();


routes.get('/ongs', ongController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email : Joi.string().required().email(),
        whatsapp : Joi.string().required().min(12).max(14),
        city : Joi.string().required(),
        uf : Joi.string().required().length(2),
    })
}), ongController.create);


routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),incidentController.index);

routes.post('/incidents',  celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(), 
    [Segments.BODY]: Joi.object().keys({
        title:Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}), incidentController.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),  incidentController.delete);


routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}),  sessionController.create);

module.exports = routes;

