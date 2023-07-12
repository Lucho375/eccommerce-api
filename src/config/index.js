import 'dotenv/config'

export default {
  SERVER_PORT: process.env.PORT,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  corsOptions: {
    origin: 'http://localhost:5173',
    credentials: true
  },
  cloudinaryConfig: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  },
  nodeMailerConfig: {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.NODEMAILER_AUTH_USERNAME,
      pass: process.env.NODEMAILER_AUTH_PASSWORD
    }
  },
  JWT: {
    ACCESS: {
      SECRET: process.env.ACCESS_TOKEN_SECRET,
      EXPIRES: '7d'
    },
    REFRESH: {
      SECRET: process.env.REFRESH_TOKEN_SECRET,
      EXPIRES: '24h'
    },
    RESET_PASSWORD: {
      SECRET: process.env.RESET_PASSWORD_TOKEN_SECRET,
      EXPIRES: '10m'
    }
  }
}
