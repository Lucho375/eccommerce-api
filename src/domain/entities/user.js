class User {
  constructor({ id, age, email, firstname, lastname, image, password, role, enabled }) {
    this.id = id
    this.age = age
    this.email = email
    this.firstname = firstname
    this.lastname = lastname
    this.image = image
    this.password = password
    this.role = role
    this.enabled = enabled
  }
}

export default User
