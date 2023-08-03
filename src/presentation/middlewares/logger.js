import logger from '../../pino.js'

export const requestInfoLogger = (req, res, next) => {
  req.logger = logger
  logger.info(`${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`)
  next()
}
