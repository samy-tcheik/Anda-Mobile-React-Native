import { IMedia } from '../../screens/app/types'

export interface LoginResponse {
  bearer: string
  user: IUser
}

export enum AuthDriver {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  APP = 'app',
}

export interface IUser {
  name: string
  email: string
  avatar?: IMedia
  auth_driver?: AuthDriver
}
