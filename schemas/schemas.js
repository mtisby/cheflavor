// server-side validation schema

import joi from "joi"

const eventSchema = joi.object({
    event: joi.object({
        dateSelected: joi.string().required(),
        timeSelected: joi.string().required(),
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required(),
        phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/).required()
    }).required()
});

export { eventSchema }