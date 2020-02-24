import jwt from 'jsonwebtoken';
import { config } from './config';

export default async user => {
	try {
		const token = await jwt.sign(
			{
				id: user._id,
				email: user.email,
				role: user.role,
				permission: user.permission,
			},
			config.jwt_secret,
			{ expiresIn: config.jwt_expiration },
		);
		return token;
	} catch (error) {
		console.log(error);
		return error;
	}
};
