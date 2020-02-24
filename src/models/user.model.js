import mongoose, { model } from 'mongoose';
import Joi from '@hapi/joi';

const validator = Joi.object().keys({
	firstName: Joi.string()
		.required()
		.max(50),
	lastName: Joi.string()
		.required()
		.max(50),
	email: Joi.string()
		.required()
		.email({ minDomainSegments: 2 })
		.max(100),
	password: Joi.string()
		.required()
		.min(8)
		.max(50),
	role: Joi.string().max(50),
	permission: Joi.array().items(Joi.string()),
});

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: [true, 'the first name is required'] },
	lastName: { type: String, required: [true, 'the last name is required'] },
	email: {
		type: String,
		required: [true, 'the email is required'],
		lowercase: true,
	},
	password: { type: String, required: [true, 'the password is required'] },
	role: { type: String, default: 'user' },
	permission: [],
});

const userParser = (data, returnPassword) => {
	const user = {
		id: data._id,
		firstName: data.firstName,
		lastName: data.lastName,
		role: data.role,
		permission: data.permission,
		email: data.email,
		password: data.password,
	};
	returnPassword ? '' : delete user.password;
	return user;
};

export default {
	model: model('user', userSchema),
	validator,
	userParser,
};
