import PortfolioModel from '../../models/portfolio.model';
import mongoose from 'mongoose';
export default {
	getPortfolios: async () => {
		try {
			const result = await PortfolioModel.model.find({});
			return result;
		} catch (e) {
			console.log(e);
		}
	},
	getPortfolio: async (root, args) => {
		try {
			const portfolio = await PortfolioModel.model.findById(args.id);
			return portfolio;
		} catch (e) {
			console.log(e);
		}
	},
};
