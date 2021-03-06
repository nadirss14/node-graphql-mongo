import '@babel/polyfill';
import mongoose from 'mongoose';
import cors from 'cors';
import Express from 'express';
import bodyParser from 'body-parser';
import { config } from './util/config';
import apiRoutes from './routes/index';
import enforce from 'express-sslify';
import helmet from 'helmet';
import notFound from '../src/middleware/notFoundHandler';
import path from 'path';
import { readFileSync } from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import gqlMiddleware from 'express-graphql';
import resolvers from './resolvers';

(async () => {
	try {
		const app = Express();
		app.use(cors());

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		if (config.environmet === 'production') {
			// Helmet and ssl enforce configuration
			app.use(
				enforce.HTTPS({
					trustProtoHeader: true,
				})
			);
			app.use(helmet());
			app.disable('x-powered-by');
		}

		// create conection
		let url = `mongodb+srv://${config.db_user}:${config.db_password}@${config.db_uri}`;

		await mongoose.connect(url, {
			useNewUrlParser: true,
			dbName: config.db_name,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		const typeDefs = readFileSync(
			path.resolve('src/models/schema/schema.graphql'),
			'utf-8'
		);
		const schema = makeExecutableSchema({ typeDefs, resolvers });

		app.use(
			'/api',
			gqlMiddleware({
				schema: schema,
				rootValue: resolvers,
				graphiql: true,
			})
		);

		// apiRoutes.userRoutes(app, config.base_url, schema);
		// apiRoutes.portfolioRoutes(app, config.base_url, schema);

		app.use(notFound);
		app.listen(config.port, () => {
			console.log(`Server is running on http://localhost:${config.port}`);
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);
		throw new Error(error.message);
	}
})();
