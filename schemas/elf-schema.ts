import Joi from "joi";

const elfId = Joi.string().guid().required();
const elfName = Joi.string().required();
const elfAge = Joi.number().required();
const elfGender = Joi.string().required();
const elfEmail = Joi.string().email().required();
const elfStature = Joi.number().required();
const elfAddress = Joi.string().required();
const elfStatus = Joi.string().required();

const elfSchema = Joi.object({
  id: elfId,
  name: elfName,
  age: elfAge,
  gender: elfGender,
  email: elfEmail,
  stature: elfStature,
  address: elfAddress,
  status: elfStatus,
});

const createElfSchema = Joi.object({
  name: elfName,
  age: elfAge,
  gender: elfGender,
  email: elfEmail,
  stature: elfStature,
  address: elfAddress,
});


const updateElfSchema = Joi.object({
  id: elfId,
  name: elfName.optional(), 
  age: elfAge.optional(),
  gender: elfGender.optional(),
  email: elfEmail.optional(),
  stature: elfStature.optional(),
  address: elfAddress.optional(),
  status: elfStatus.optional(),
});


const getElfSchema = Joi.object({
  id: elfId.required(),
});


const elfSchemas = {
  create: createElfSchema,
  update: updateElfSchema,
  get: getElfSchema,
};

export default elfSchemas;

