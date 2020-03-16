import PortfolioModel from '../../models/portfolio.model';
import mongoose from 'mongoose';

export default {
	createPortfolio: async (root, { input }) => {
		try {
			const isValid = PortfolioModel.validator.validate(input);
			if (isValid.error) {
				return isValid.error;
			}

			const result = await PortfolioModel.model.create(input);
			return result;
		} catch (error) {
			console.log(error);
		}
	},
	updatePortfolio: async (root, { _id, input }) => {
		try {
			// const isValid = PortfolioModel.validator.validate(input);
			// if (isValid.error) {
			// 	return isValid.error;
			// }

			const portfolio = await PortfolioModel.model.findById(_id);
			if (portfolio) {
				const result = await PortfolioModel.model.findOneAndUpdate(
					{ _id: portfolio._id },
					{ $set: input }
				);
				return result;
			} else {
				return { error: 'portfolio not found' };
			}
		} catch (error) {
			console.log(error);
		}
	},
};
