import Joi = require('@hapi/joi');
import { endDateSchema, startDateSchema } from '../../../utils/common.schemas';

export const getRoomsSchema = Joi.object({
    start: startDateSchema.required(),
    end: endDateSchema.required(),
});
