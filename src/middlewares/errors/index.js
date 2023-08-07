import enumErrors from "./enums.js";

export default async (error, req, res, next) => {

    switch (error.code) {

        case enumErrors.INVALID_TYPE_ERROR:
            res.status(400).send({
                status: 'error',
                error: error.name,
                description: error.cause
            });
        break;

        default:
            res.status(500).send({
                status: 'error',
                error: error.name,
                description: error.cause
            });
        break;
    };
    next();
};