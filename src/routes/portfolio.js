import express from 'express';
import path from 'path';
import boom from '@hapi/boom';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import myJwt from '../middleware/auth/jwt';
import { readFileSync } from 'fs';
import { buildSchema } from 'graphql';
import gqlMiddleware from 'express-graphql';
import resolvers from '../resolvers/PortfolioResolver';

export default (app, BASE_URL) => {
	const router = express.Router();
	const apiPath = `/${BASE_URL}/portfolio`;

	const schema = buildSchema(
		readFileSync(path.resolve('src/models/schema/schema.graphql'), 'utf-8')
	);

	app.use(apiPath, router);
	app.use(passport.initialize());

	myJwt(passport);

	app.use(
		'/api',
		gqlMiddleware({
			schema: schema,
			rootValue: resolvers,
			graphiql: true,
		})
	);

	router.get('/', async (req, res, next) => {
		return res.status(200).json({ message: 'Portfolio is Ok' });
	});
};
