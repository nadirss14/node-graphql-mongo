import dotenv from 'dotenv';
dotenv.config();

export const config = {
	port: process.env.PORT || 3008,
	environmet: process.env.NODE_ENV,
	base_url: `${process.env.API_BASE}/${process.env.API_VERSION}`,
	db_uri:
		process.env.NODE_ENV === 'development'
			? process.env.DEV_DB_URI
			: process.env.DB_URI,
	db_user:
		process.env.NODE_ENV === 'development'
			? process.env.DEV_DB_USER
			: process.env.DB_USER,
	db_password:
		process.env.NODE_ENV === 'development'
			? process.env.DEV_DB_PASS
			: process.env.DB_PASS,
	db_name:
		process.env.NODE_ENV === 'development'
			? process.env.DEV_DB_NAME
			: process.env.DB_NAME,
	jwt_secret: process.env.JWT_SECRET,
	jwt_expiration: process.env.JWT_EXPIRATION,
	authorized_client: process.env.AUTH_CLIENTE,
	authorized_key: process.env.AUTH_KEY,
	timeToCloseToken: process.env.JWT_CLOSE_TO_EXPIRED,
};
