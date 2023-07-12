import { v2 as cloudinary } from 'cloudinary'
import config from '../config/index.js'

cloudinary.config(config.cloudinaryConfig)

export async function uploadImage(image, folder, imageName) {
  const options = {
    folder,
    public_id: imageName,
    overwrite: true
  }
  return cloudinary.uploader.upload(image, options)
}

// class CloudinaryService{
//   constructor(){
//     cloudinary.config(config.cloudinaryConfig)
//   }

//   async uploadImage(){

//   }
// }
