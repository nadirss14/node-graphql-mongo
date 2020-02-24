import { Strategy, ExtractJwt } from 'passport-jwt';
import boom from '@hapi/boom';
import { config } from '../../util/config';
import { json } from 'body-parser';
import UserModel from '../../models/user.model';

export default passport => {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: config.jwt_secret,
	};

	passport.use(
		new Strategy(opts, async (tokenPayload, callback) => {
			try {
				const user = await UserModel.model.findById(tokenPayload.id);
				if (!user) {
					return callback(JSON.stringify(boom.unauthorized()), false);
				}
				delete user._doc.password;
				return callback(null, { ...user._doc, tokenPayload });
			} catch (error) {
				return callback(error);
			}
		}),
	);
};
