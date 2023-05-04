import { model, Schema } from 'mongoose'

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    code: {
      type: String,
      unique: true,
      required: true
    },
    thumbnail: {
      type: [String],
      required: false
    },
    price: {
      type: Number,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

const ProductModel = model('Products', ProductSchema)

export default ProductModel
