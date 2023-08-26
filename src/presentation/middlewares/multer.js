import multer from 'multer'
import { ValidationError } from '../../domain/index.js'

const storage = multer.memoryStorage()

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    return cb(null, true)
  }
  cb(new ValidationError('Not valid image!'))
}

export const upload = multer({ storage, fileFilter: imageFilter })
