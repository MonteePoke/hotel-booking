import Joi = require('@hapi/joi');

export const createBookingSchema = Joi.object({
    roomId: Joi.number().required(),
    start: Joi.date().required(),
    end: Joi.date().min(Joi.ref('start')).required(),
    booker_name: Joi.string().min(1).max(255),
    booker_phone: Joi.string().min(1).max(255),
    booker_mail: Joi.string().min(1).max(255),
});
