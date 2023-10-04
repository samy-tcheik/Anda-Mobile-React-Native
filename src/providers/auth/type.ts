export interface LoginResponse {
  bearer: string
}

export interface IUser {
  name: string
  email: string
  username: string
  avatar?: string
  avatarThumb?: string
}
