import { v2 as cloudinary } from 'cloudinary'
import 'dotenv/config'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function uploadImage(image, folder, imageName) {
  const options = {
    folder,
    public_id: imageName,
    overwrite: true
  }
  try {
    const result = await cloudinary.uploader.upload(image, options)
    return result
  } catch (error) {
    return error
  }
}
