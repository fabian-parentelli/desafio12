import winston from 'winston';
import config from '../../config/dotEnv.config.js';

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'blue',
        debug: 'blue'
    }
};

let logger;

if (config.enviroment === 'production') {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({ all: true, colors: customLevelOptions.colors }),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({ filename: 'logs/errors.log', level: 'error' })
        ]
    });
} else {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({ all: true, colors: customLevelOptions.colors }),
                    winston.format.simple()
                )
            })
        ]
    });
};



export { logger };