import mongoose, { model } from 'mongoose';
import Joi from '@hapi/joi';

const validator = Joi.object().keys({
	email: Joi.string()
		.required()
		.email({ minDomainSegments: 2 })
		.max(100),
	password: Joi.string()
		.required()
		.min(8)
		.max(50),
	authorizedClient: Joi.string()
		.required()
		.max(20),
	authorizedKey: Joi.string()
		.required()
		.max(50),
});

export default { validator };
