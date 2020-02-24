import { config } from './config';
import newToken from './generateNewToken';
import jwt from 'jsonwebtoken';

export default async token => {
	try {
		const payload = await jwt.verify(token.Token, config.jwt_secret);

		const user = {
			_id: payload.id,
			email: payload.email,
			role: payload.role,
			permission: payload.permission,
		};

		const expiryTime = payload.exp;
		const currentTime = Date.now() / 1000;
		const tokenIsToExpired =
			(expiryTime - currentTime) / 60 < config.timeToCloseToken;

		if (tokenIsToExpired) {
			const myNewToken = await newToken(user);
			return { tokenIsToExpired: tokenIsToExpired, token: myNewToken };
		}

		return { tokenIsToExpired: tokenIsToExpired, token: token };
	} catch (error) {
		console.log(error.message);
		return { tokenIsToExpired: false, token: null };
	}
};
