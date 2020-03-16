import express from 'express';
import boom from '@hapi/boom';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import myJwt from '../middleware/auth/jwt';

export default (app, BASE_URL, SQUEMA) => {
	const router = express.Router();
	const Path = `/${BASE_URL}/portfolio`;

	app.use(Path, router);
	app.use(passport.initialize());

	myJwt(passport);

	router.get('/', async (req, res, next) => {
		return res.status(200).json({ message: 'Portfolio is Ok' });
	});
};
