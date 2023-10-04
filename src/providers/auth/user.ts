import { IUser } from './type'

export default class User implements IUser {
  readonly name: string
  readonly email: string
  readonly username: string
  readonly avatar?: string
  readonly avatarThumb?: string

  constructor(data: any) {
    this.name = data.name
    this.email = data.email
    this.username = data.username
    this.avatar = data.avatar
    this.avatarThumb = data.avatar_thumb
  }
}
