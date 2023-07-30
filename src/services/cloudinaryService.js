import { v2 as cloudinary } from 'cloudinary'
import config from '../config/index.js'
import fs from 'fs/promises'

class CloudinaryService {
  constructor() {
    cloudinary.config(config.cloudinaryConfig)
    this.cloudinary = cloudinary
  }

  async uploadImage(image, folder, imageName) {
    await fs.writeFile('temp_image.jpg', image)
    const uploadedImage = await this.cloudinary.uploader.upload('temp_image.jpg', {
      folder,
      overwrite: true,
      public_id: imageName,
      resource_type: 'image',
      format: 'webp'
    })
    await fs.unlink('temp_image.jpg')
    return uploadedImage
  }
}

export default CloudinaryService
