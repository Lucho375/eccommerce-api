import { CloudinaryService } from '../../services/index.js'

export function imageUploader(foldername) {
  return async (req, res, next) => {
    try {
      const cloudinaryUploader = new CloudinaryService()
      const uploadedImage = await cloudinaryUploader.uploadImage(req.file.buffer, foldername, `${Math.random()}`)
      req.uploadedImage = uploadedImage.secure_url
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
