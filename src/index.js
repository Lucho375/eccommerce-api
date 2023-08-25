import { DbFactory } from './data/factories/index.js'
import { AppFactory } from './presentation/factories/index.js'
import config from './config/index.js'
;(async () => {
  const db = DbFactory.create()
  await db.init(config.DB_URI)
  const app = AppFactory.create()
  app.init()
  app.build()
  app.listen()
})()
