import bcrypt from 'bcrypt'

export async function createHash(password) {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export async function compareHash(password, hash) {
  const isValidPass = await bcrypt.compare(password, hash)
  return isValidPass
}
