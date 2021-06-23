import Joi, { CustomValidator } from '@hapi/joi';
import moment from 'moment';

const customDateValidator: CustomValidator = (value, helper) => {
    if (moment(helper.original, true).isValid()) {
        return new Date(helper.original);
    } else {
        return helper.message({
            custom: `"${helper.state.path}" must be a valid date`,
        });
    }
};

export const startDateSchema: Joi.Schema = Joi.date().custom(customDateValidator);
export const endDateSchema: Joi.Schema = Joi.date()
    .custom(customDateValidator)
    .min(Joi.ref('start'));
