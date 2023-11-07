export interface IWilaya {
  id: string
  name: string
}

export interface ITown {
  id: string
  name: string
}
export interface IPlace {
  id: number
  name: string
  distance: number
  town: ITown
  wilaya: IWilaya
  description: string
}
