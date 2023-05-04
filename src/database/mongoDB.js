import mongoose from 'mongoose'
import config from '../config/config.js'

async function MongoDbConnection() {
  const { MONGO_DB_URI } = config
  if (!MONGO_DB_URI) {
    throw new Error('Missing MONGO_DB_URI environment variable')
  }
  try {
    await mongoose.connect(MONGO_DB_URI)
    console.log('Connected to database')
  } catch (error) {
    console.log({ error: error.message })
  }
}

export default MongoDbConnection
