import { nanoid } from 'nanoid'
import { CloudinaryService } from '../../services/index.js'

export function imageUploader(foldername) {
  return async (req, res, next) => {
    try {
      if (req?.file) {
        const cloudinaryUploader = new CloudinaryService()
        const uploadedImage = await cloudinaryUploader.uploadImage(req?.file?.buffer, foldername, nanoid())
        req.uploadedImage = uploadedImage.secure_url
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}
