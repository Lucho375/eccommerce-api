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
    email: {
      type: String,
      unique: true,
      required: true
    },
    role: {
      type: String,
      default: 'USER_ROLE'
    },
    enabled: {
      type: Boolean,
      default: true
    },
    image: {
      type: String,
      required: false,
      default:
        'https://res.cloudinary.com/dkruwae6j/image/upload/v1682373644/users/ghs4werjrztszflmxodw.webp'
    }
  },
  {
    timestamps: true
  }
)

const UserModel = model('Users', userSchema)

export default UserModel
