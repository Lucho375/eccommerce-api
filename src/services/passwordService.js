import bcrypt from 'bcrypt'

export class PasswordService {
  static async compare(password, hash) {
    return bcrypt.compare(password, hash)
  }

  static async hash(password) {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
  }
}
