import mongoose, { model } from 'mongoose';

const portfolioSquema = new mongoose.Schema({
	version: { type: String },
	name: { type: String },
	lastName: { type: String },
	country: { type: String },
	city: { type: String },
	birthdate: { type: String },
	gender: { type: String },
	profecion: { type: String },
	occupation: { type: String },
	email: [],
	socialMedia: [],
	site: { type: String },
	about: { type: String },
	hobbies: { type: String },
});

export default {
	model: model('portfolio', portfolioSquema),
};
