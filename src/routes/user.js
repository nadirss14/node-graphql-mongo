import express from 'express';
import boom from '@hapi/boom';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import myJwt from '../middleware/auth/jwt';
import LoginModel from '../models/login.model';
import UserModel from '../models/user.model';
import newToken from '../util/generateNewToken';
import expiredToken from '../util/expiredToken';
import validateClient from '../util/validateClient';

export default (app, BASE_URL) => {
	const router = express.Router();
	const path = `/${BASE_URL}/user`;
	app.use(path, router);
	app.use(passport.initialize());

	myJwt(passport);

	router.get('/', async (req, res, next) => {
		return res.status(200).json({ message: 'is Ok' });
	});

	router.post('/login', async (req, res, next) => {
		try {
			const isLoginValid = LoginModel.validator.validate(req.body);
			if (isLoginValid.error) {
				return res
					.status(401)
					.json(boom.unauthorized('Invalid email or password').output);
			} else {
				if (!validateClient(req.body)) {
					return res
						.status(401)
						.json(boom.unauthorized('Invalid email or password').output);
				}
			}

			const { email, password } = req.body;
			const user = await UserModel.model.findOne({ email: email });
			if (!user) {
				return res
					.status(401)
					.json(boom.unauthorized('Invalid email or password').output);
			}

			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) {
				return res
					.status(401)
					.json(boom.unauthorized('Invalid email or password compare').output);
			}

			const token = await newToken(user);
			return res.status(200).json({ Token: token });
		} catch (error) {
			next(error);
		}
	});

	router.post(
		'/refreshtoken',
		passport.authenticate('jwt', { session: false }),
		async (req, res, next) => {
			try {
				const token = req.body;
				if (!token) {
					return res.status(403).json(boom.forbidden().output);
				}

				const tokenIsToExpired = await expiredToken(token);

				if (!tokenIsToExpired.token) {
					return res.status(401).json(boom.unauthorized().output);
				}
				return res.status(200).json(tokenIsToExpired.token);
			} catch (error) {
				next(error);
			}
		},
	);


	router.post('/', async (req, res, next) => {
		try {
			const validation = UserModel.validator.validate(req.body);
			if (validation.error) {
				return res.status(400).json(boom.badRequest(validation.error).output);
			}
			const user = await UserModel.model.findOne({ email: req.body.email });
			if (user) {
				return res
					.status(422)
					.json(boom.badRequest('Email already exists').output);
			}

			// const userLogin = await UserModel.model.findById(req.user._id);
			// if (!userLogin) {
			// 	return res.status(401).json(boom.unauthorized().output);
			// }

			// if (req.user.role === 'user') {
			// 	return res.status(401).json(boom.unauthorized().output);
			// }

			let newUser = { ...req.body };
			newUser.role = 'user';
			newUser.password = await bcrypt.hash(newUser.password, 10);
			const result = await UserModel.model.create(newUser);

			if (result) {
				return res.status(200).json(UserModel.userParser(result, false));
			} else {
				return res.status(200).json({ status: false });
			}
		} catch (e) {
			next(e);
		}
	});

	router.put(
		'/',
		passport.authenticate('jwt', { session: false }),
		async (req, res, next) => {
			try {
				const user = await UserModel.model.findById(req.user._id);
				if (!user) {
					return res.status(401).json(boom.unauthorized().output);
				}

				const { id, firstName, lastName } = req.body;

				const userEdit = await UserModel.model.findById(id);
				if (!userEdit) {
					return res.status(401).json(boom.badRequest('User not found').output);
				}

				let updateIsOk = false;

				if (user.role !== 'user') {
					updateIsOk = true;
				} else if (user._id.toString() === userEdit._id.toString()) {
					updateIsOk = true;
				} else {
					return res.status(401).json(boom.unauthorized().output);
				}

				const finalEdit = {
					firstName: !firstName ? userEdit.firstName : firstName,
					lastName: !lastName ? userEdit.lastName : lastName,
				};

				if (updateIsOk) {
					const result = await UserModel.model.findOneAndUpdate(
						{ _id: id },
						{ ...finalEdit },
					);
					if (result) {
						return res.status(200).json({ status: true });
					} else {
						return res.status(200).json({ status: false });
					}
				} else {
					return res
						.status(401)
						.json(boom.unauthorized('The user is not authorized').output);
				}
			} catch (error) {
				next(error);
			}
		},
	);

	router.get(
		'/getAll',
		passport.authenticate('jwt', { session: false }),
		async (req, res, next) => {
			try {
				const user = await UserModel.model.findById(req.user._id);
				if (!user) {
					return res.status(401).json(boom.unauthorized().output);
				}

				const allUser = await UserModel.model.find({});
				const result = allUser.map(user => {
					return UserModel.userParser(user, false);
				});
				return res.status(200).json(result);
			} catch (e) {
				next(e);
			}
		},
	);

	router.post(
		'/me',
		passport.authenticate('jwt', { session: false }),
		async (req, res, next) => {
			try {
				// validating if the user id exists
				const user = await UserModel.model.findById(req.user._id);

				if (!user) {
					return res.status(401).json(boom.unauthorized().output);
				}

				return res.status(200).json(UserModel.userParser(user, false));
			} catch (e) {
				next(e);
			}
		},
	);

	router.get(
		'/:id',
		passport.authenticate('jwt', { session: false }),
		async (req, res, next) => {
			try {
				// validating if the user id exists
				const user = await UserModel.model.findById(req.user._id);
				if (!user) {
					return res.status(400).json(boom.badRequest('User not found').output);
				}

				const userFind = await UserModel.model.findById(req.params.id);
				if (userFind) {
					return res.status(200).json(UserModel.userParser(userFind, false));
				} else {
					return res.status(400).json(boom.badRequest('User not found').output);
				}
			} catch (e) {
				next(e);
			}
		},
	);


};
