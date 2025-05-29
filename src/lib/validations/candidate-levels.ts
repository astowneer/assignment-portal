import Joi from "joi";

const candidateLevelsSchema = Joi.object({
  levels: Joi.array().items(Joi.string().min(1)).required(),
});

export { candidateLevelsSchema };
