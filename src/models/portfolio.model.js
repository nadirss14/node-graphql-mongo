import mongoose, { model } from 'mongoose';
import Joi from '@hapi/joi';
const portfolioSquema = new mongoose.Schema(
	{
		version: { type: String },
		name: { type: String },
		lastName: { type: String },
		country: { type: String },
		city: { type: String },
		birthdate: { type: Date },
		gender: { type: String },
		profession: { type: String },
		occupation: { type: String },
		email: [],
		socialMedia: [],
		site: { type: String },
		about: { type: String },
		hobbies: { type: String },
	},
	{
		timestamps: true,
	}
);

const validator = Joi.object({
	version: Joi.string().required(),
	name: Joi.string().required(),
	lastName: Joi.string().required(),
	country: Joi.string().required(),
	city: Joi.string().required(),
	birthdate: Joi.date().required(),
	gender: Joi.string()
		.required()
		.max(1),
	profession: Joi.string()
		.required()
		.min(5)
		.max(100),
	occupation: Joi.string()
		.required()
		.min(5)
		.max(100),
	email: Joi.array().items(
		Joi.object({
			provider: Joi.string().required(),
			email: Joi.string().required(),
		})
	),
	socialMedia: Joi.array().items(
		Joi.object({
			name: Joi.string().required(),
			url: Joi.string().required(),
		})
	),
	site: Joi.string().required(),
	about: Joi.string().required(),
	hobbies: Joi.string()
		.required()
		.max(500),
});

export default {
	model: model('portfolios', portfolioSquema),
	validator,
};
