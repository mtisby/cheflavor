import joi from "joi"

const eventSchema = joi.object({
    event: joi.object({
        dateSelected: joi.string().required(),
        timeSelected: joi.string().required(),
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required(),
        phoneNumber: joi.number().required()
    }).required()
});

export { eventSchema }