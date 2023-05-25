import bcrypt from 'bcrypt'

export async function createHash(password) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function compareHash(password, hash) {
  return bcrypt.compare(password, hash)
}
