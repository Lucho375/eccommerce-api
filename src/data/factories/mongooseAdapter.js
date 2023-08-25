import mongoose from 'mongoose'
import logger from '../../pino.js'

export class MongooseAdapter {
  async init(uri) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      logger.info('Connected to mongoose')
    } catch (err) {
      logger.error('Error connecting to mongoose:', err)
      throw err
    }
  }

  async close() {
    try {
      await mongoose.connection.close()
      logger.info('Mongoose connection closed')
    } catch (err) {
      logger.error('Error closing mongoose connection:', err)
      throw err
    }
  }

  async dropDatabase() {
    try {
      await mongoose.connection.dropDatabase()
      logger.info('Database dropped')
    } catch (err) {
      logger.error('Error dropping database')
      throw err
    }
  }
}
