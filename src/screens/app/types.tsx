export interface IWilaya {
  id: string
  name: string
}

export interface ITown {
  id: string
  name: string
}
export interface IPlace {
  id: string
  name: string
  distance: number
  town: ITown
  wilaya: IWilaya
  description: string
  rating: number
  rating_count: number
  comment_count: number
  liked: boolean
  latitude: string
  longitude: string
}

export interface IRating {
  rating: string
}

export enum LikeType {
  PLACE = 'PLACE',
  COMMENT = 'COMMENT',
}
