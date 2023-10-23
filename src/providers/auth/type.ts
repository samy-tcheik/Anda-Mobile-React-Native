export interface LoginResponse {
  bearer: string
}

export interface IUser {
  name: string
  email: string
  avatar?: string
}
