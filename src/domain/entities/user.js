class User {
  constructor(props) {
    this.id = props.id
    this.age = props.age
    this.email = props.email
    this.firstname = props.firstname
    this.lastname = props.lastname
    this.image = props.image
    this.password = props.password
    this.role = props.role
    this.enabled = props.enabled
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }
}

export default User
