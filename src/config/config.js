import 'dotenv/config'
export default {
  SERVER_PORT: process.env.PORT,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  corsOptions: {
    origin: '*'
  }
}
