const boom = require('@hapi/boom');

export default function notFoundHandler(req, res, next) {
	const {
		output: { statusCode, payload },
	} = boom.notFound(`Endpoint '${req.originalUrl}' Not Found`);
 return	res.status(statusCode).json(payload);
}
