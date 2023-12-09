import { IUser } from '../../../../providers/auth/type'

export interface IComment {
  id: string
  comment: string
  user: IUser
}
