import config from './config/index.js'
import { DbFactory } from './data/factories/index.js'
import { deleteInactiveUsers } from './presentation/crons/deleteInactiveUsers.js'
import { AppFactory } from './presentation/factories/index.js'
import { CronScheduler } from './services/index.js'
;(async () => {
  const db = DbFactory.create()
  await db.init(config.DB_URI)
  const app = AppFactory.create()
  app.init()
  app.build()
  app.listen()

  const cronScheduler = new CronScheduler()
  // “At 00:30 on day-of-month 1.”
  cronScheduler.scheduleTask('30 00 1 * *', deleteInactiveUsers)
})()
