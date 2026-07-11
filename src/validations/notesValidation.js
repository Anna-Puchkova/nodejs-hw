import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';
import { isValidObjectId } from 'mongoose';

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).max(100).allow(''),
    tag: Joi.string().valid(...TAGS),
  }),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1),
    perPage: Joi.number().integer().min(5).max(20),
    tag: Joi.string().valid(...TAGS),

    search: Joi.string().trim().allow(''),
  }),
};
const objIdValidator = (value, helpers) => {
  if (isValidObjectId(value)) {
    return value;
  }
  return helpers.message('Bad id format');
};
export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objIdValidator).required(),
  }),
};
export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(100),
    content: Joi.string().min(1).max(100).allow(''),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objIdValidator).required(),
  }),
};
