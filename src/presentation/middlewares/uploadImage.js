import CloudinaryService from '../../services/cloudinaryService.js'

export default async function uploadImage(req, res, next) {
  try {
    console.log(req.file)
    const cloudinaryUploader = new CloudinaryService()
    const uploadedImage = await cloudinaryUploader.uploadImage(req.file.buffer, 'products', `${Math.random()}`)
    req.productImage = uploadedImage.secure_url
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}
