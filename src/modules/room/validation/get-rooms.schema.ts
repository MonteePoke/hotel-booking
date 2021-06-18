import Joi = require('@hapi/joi');

export const getRoomsSchema = Joi.object({
    start: Joi.date().required(),
    end: Joi.date().min(Joi.ref('start')).required(),
});
