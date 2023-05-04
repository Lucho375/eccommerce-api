/* eslint no-unused-vars: "off" */
import MongoDbConnection from './database/mongoDB.js'
import app from './app.js'
import config from './config/config.js'
;(async function () {
  const { SERVER_PORT } = config
  if (!SERVER_PORT) {
    throw new Error('Missing PORT environment variable')
  }
  await MongoDbConnection()
  const httpServer = app.listen(SERVER_PORT, () =>
    console.log(`Server running on port : ${SERVER_PORT}`)
  )
})()
