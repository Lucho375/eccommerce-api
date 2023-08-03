import * as Sentry from '@sentry/node'
import config from './config/index.js'

export const sentry = appExpress =>
  Sentry.init({
    dsn: config.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({
        tracing: true
      }),
      new Sentry.Integrations.Express({
        appExpress
      })
    ],
    tracesSampleRate: 1.0
  })

export default Sentry
