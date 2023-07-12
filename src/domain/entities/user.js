class User {
  constructor({ id, age, email, firstname, lastname, image, password, role, enabled, createdAt, updatedAt }) {
    this.id = id
    this.age = age
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.image = image
    this.password = password
    this.role = role
    this.enabled = enabled
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

export default User
