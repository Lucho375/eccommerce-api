import * as Sentry from '@sentry/node'
import config from '../config/index.js'

export class SentryService {
  #appExpress
  constructor(appExpress) {
    if (!appExpress) throw new Error('Needed express application')
    this.#appExpress = appExpress
  }

  initialize() {
    Sentry.init({
      dsn: config.SENTRY_DSN,
      integrations: [
        new Sentry.Integrations.Http({
          tracing: true
        }),
        new Sentry.Integrations.Express({
          app: this.#appExpress
        })
      ],
      tracesSampleRate: 1.0
    })
  }
}
