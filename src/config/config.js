import 'dotenv/config'

const DB =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGO_DB_URI
    : process.env.MONGO_DB_LOCALHOST

export default {
  SERVER_PORT: process.env.PORT,
  MONGO_DB_URI: DB,
  corsOptions: {
    origin: '*'
  }
}
