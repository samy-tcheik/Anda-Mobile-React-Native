import { AuthDriver, IUser } from './type'

export default class User implements IUser {
  readonly name: string
  readonly email: string
  readonly avatar?: string
  readonly auth_driver?: AuthDriver

  constructor(data: any) {
    this.name = data.name
    this.email = data.email
    this.avatar = data.avatar
    this.auth_driver = data.avatar_driver
  }
}
