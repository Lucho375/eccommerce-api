import mongoose from 'mongoose'
import logger from '../../pino.js'

class MongooseAdapter {
  async init(uri) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      logger.info('Connected to mongoose')
    } catch (err) {
      console.error('Error connecting to mongoose:', err)
      throw err
    }
  }

  async close() {
    try {
      await mongoose.connection.close()
      console.log('Mongoose connection closed')
    } catch (err) {
      console.error('Error closing mongoose connection:', err)
      throw err
    }
  }

  async dropDatabase() {
    try {
      await mongoose.connection.dropDatabase()
      console.log('Database dropped')
    } catch (err) {
      console.error('Error dropping database')
      throw err
    }
  }
}

export default MongooseAdapter
