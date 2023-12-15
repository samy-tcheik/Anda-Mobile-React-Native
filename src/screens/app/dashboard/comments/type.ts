import { IUser } from '../../../../providers/auth/type'

export interface IComment {
  id: string
  comment: string
  created_at: string
  likes_count: string
  liked: boolean
  user: IUser
}
