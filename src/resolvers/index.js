import UserResolvers from './UserResolver';
import PortfolioResolver from './PortfolioResolver';

export default {
	Query: { ...PortfolioResolver, ...UserResolvers },
};
