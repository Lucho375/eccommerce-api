import mongoose from 'mongoose'

class MongooseAdapter {
  async init(uri) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

      console.log('Connected to mongoose')
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
}

export default MongooseAdapter
