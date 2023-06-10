import MongoDbConnection from './database/mongoDB.js'
import config from './config/index.js'
import AppFactory from './presentation/factories/appFactory.js'
;(async function () {
  const { SERVER_PORT } = config
  if (!SERVER_PORT) {
    throw new Error('Missing PORT environment variable')
  }
  await MongoDbConnection()

  const app = AppFactory.create()
  app.init()
  app.build()
  app.listen()
})()
