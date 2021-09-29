import Joi from "joi"

const eventSchema = Joi.object({
    event: Joi.object({
        dateSelected: Joi.string().required(),
        timeSelected: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        phoneNumber: Joi.phoneNumber().required()
    }).required()
});

export { eventSchema }