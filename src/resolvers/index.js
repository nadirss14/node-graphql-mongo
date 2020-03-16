import UserResolvers from './Querys/User';
import PortfolioResolver from './Querys/Portfolio';
import PortfolioMutations from './Mutations/Portfolio';
export default {
	Query: { ...PortfolioResolver, ...UserResolvers },
	Mutation: { ...PortfolioMutations },
};
