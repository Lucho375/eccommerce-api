import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs/promises'
import config from '../config/index.js'

export class CloudinaryService {
  constructor() {
    cloudinary.config(config.cloudinaryConfig)
    this.cloudinary = cloudinary
  }

  async uploadImage(image, folder, imageName) {
    await fs.writeFile(`${imageName}.jpg`, image)
    const uploadedImage = await this.cloudinary.uploader.upload(`${imageName}.jpg`, {
      folder,
      overwrite: true,
      public_id: imageName,
      resource_type: 'image',
      format: 'webp'
    })
    await fs.unlink(`${imageName}.jpg`)
    return uploadedImage
  }
}
