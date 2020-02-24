import { config } from './config';

export default body => {
	const success =
		body.authorizedClient.toString() === config.authorized_client.toString() &&
		body.authorizedKey.toString() === config.authorized_key.toString();
	return success ? true : false;
};
