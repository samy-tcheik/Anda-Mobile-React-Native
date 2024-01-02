import { IPlace } from '../../../types'

export interface IHomeResponse {
  explore: IExploreData
  nearby: IHomeCategory[]
}

export interface IHomeCategory {
  id: string
  key:
    | 'art_and_culture'
    | 'coastal_sites'
    | 'recreation_and_relaxation'
    | 'sacred_and_religious_sites'
    | 'historic_sites'
    | 'natural_sites'
    | 'entertainment'
  name: string
  places: IPlace[]
}

export interface IExploreData {
  most_viewed: IPlace[]
  most_liked: IPlace[]
  most_rated: IPlace[]
  most_popular: IPlace[]
}
