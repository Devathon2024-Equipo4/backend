import Joi from "joi";

const elfId = Joi.string().guid().required();
const elfName = Joi.string().required();
const elfAge = Joi.number().required();
const elfGender = Joi.string().required();
const elfEmail = Joi.string().email().required();
const elfStature = Joi.number().required();
const elfAddress = Joi.string().required();

const elfSchema = Joi.object({
  id: elfId,
  name: elfName,
  age: elfAge,
  gender: elfGender,
  email: elfEmail,
  stature: elfStature,
  address: elfAddress,
});

const create = Joi.object({
  name: elfName,
  age: elfAge,
  gender: elfGender,
  email: elfEmail,
  stature: elfStature,
  address: elfAddress,
});

const update = Joi.object({
  id: elfId,
  name: elfName,
  age: elfAge,
  gender: elfGender,
  email: elfEmail,
  stature: elfStature,
  address: elfAddress,
});

const elfCreateSchema = create.keys({
  elf: create
});

const elfUpdateSchema = update.keys({
  elf: update
});

const getElfSchema = elfId.keys({
  elf: elfId.required()
});



const elveSchema = {
  create: elfCreateSchema,
  update: elfUpdateSchema,
  get: getElfSchema
}

export default elveSchema;

