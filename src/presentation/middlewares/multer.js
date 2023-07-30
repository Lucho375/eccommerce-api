import multer from 'multer'
import { ValidationError } from '../../domain/validations/ValidationError.js'

const storage = multer.memoryStorage()

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    return cb(null, true)
  }
  cb(new ValidationError('Imagen no válida'))
}

const upload = multer({ storage, fileFilter: imageFilter })

export default upload
