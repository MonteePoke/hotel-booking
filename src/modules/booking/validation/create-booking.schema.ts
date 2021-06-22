import Joi = require('@hapi/joi');
import { endDateSchema, startDateSchema } from '../../../utils/common.schemas';

export const createBookingSchema = Joi.object({
    roomId: Joi.number().required(),
    start: startDateSchema.required(),
    end: endDateSchema.required(),
    booker_name: Joi.string().min(1).max(255),
    booker_phone: Joi.string().min(1).max(255),
    booker_mail: Joi.string().min(1).max(255),
});
