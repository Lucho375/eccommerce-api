import pino from 'pino'

const logger = pino({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: 'pid,hostname'
    }
  },
  timestamp: () => {
    const now = new Date()
    return `,"time":"${now.toLocaleDateString()} - ${now.toLocaleTimeString()}"`
  }
})

export default logger
