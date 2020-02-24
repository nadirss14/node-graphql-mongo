import PortfolioModel from '../models/portfolio.model';

export default {
	getPortfolios: async () => {
		try {
			const result = await PortfolioModel.model.find({});

			return res.status(200).json(result);
		} catch (e) {
			console.log(e);
		}
	},
	getPortfolio: (root, args) => {
		const portfolio = myPortfolio.filter(port => port._id === args.id);
		return portfolio.pop();
	},
};
