import { createLogger, format, transports } from 'winston';

const uppercaseLevelFormat = format(info => {
    info.level = info.level.toUpperCase()
    return info;
  })();

const logFormat = format.combine(
    format.timestamp(), 
    format.splat(),
    format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
);

export const logger = createLogger({
    format: format.combine(uppercaseLevelFormat, logFormat),
    transports: [
        new transports.Console({
            format: format.combine(uppercaseLevelFormat, format.colorize(), logFormat)
        }),
        new transports.File({ filename: 'latest.log' })
    ]
});

export function requestLogger(req, res, next) {
    res.on('finish', _ => {
        logger.info(`${req.ip} ${req.method} ${req.originalUrl} ${res.statusCode}`);
    });
    next();
}