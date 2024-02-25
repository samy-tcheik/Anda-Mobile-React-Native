import { IUser } from '../../providers/auth/type'

export interface IWilaya {
  id: string
  key: string
  name: string
}

export interface ITown {
  id: string
  key: string
  name: string
}

interface ITotalReviewItem {
  avg: number
  count: number
}

export interface ITotalReviews {
  excellent: ITotalReviewItem
  good: ITotalReviewItem
  average: ITotalReviewItem
  bad: ITotalReviewItem
  very_bad: ITotalReviewItem
}
export interface IPlace {
  id: string
  name: string
  distance: number
  town: ITown
  wilaya: IWilaya
  description: string
  rating: number
  review_count: number
  total_reviews: ITotalReviews
  reviews: IReview[]
  reviewed: boolean
  liked: boolean
  latitude: string
  longitude: string
  media: string[]
}

export interface IReview {
  id: string
  rating: number
  comment: string
  user: IUser
  created_at: string
  likes_count: string
  liked: boolean
}

export interface ICategory {
  id: string
  key: string
  name: string
}

export interface IRating {
  rating: string
}

export enum LikeType {
  PLACE = 'PLACE',
  REVIEW = 'REVIEW',
}
