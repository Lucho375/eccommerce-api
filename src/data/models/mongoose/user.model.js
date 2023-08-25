import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: false
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    enabled: {
      type: Boolean,
      default: true
    },
    image: {
      type: String,
      required: false,
      default: 'https://res.cloudinary.com/dkruwae6j/image/upload/v1682373644/users/ghs4werjrztszflmxodw.webp'
    }
  },
  {
    timestamps: true
  }
)

export const UserModel = model('User', userSchema)
