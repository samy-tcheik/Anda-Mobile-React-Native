export interface IWilaya {
  id: string
  name: string
}

export interface ICategory {
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
}
