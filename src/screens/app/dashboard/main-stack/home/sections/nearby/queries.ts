import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { ICategory, IWilaya } from './types'
import { IFilter } from '../../../../../../../hooks/useFilters'

export function useWilayas(config?: UseQueryOptions<IWilaya[]>) {
  return useQuery<IWilaya[]>(['wilaya'], config)
}

export function useCategories(config?: UseQueryOptions<ICategory[]>) {
  return useQuery<ICategory[]>(['categories'], config)
}

export function usePlaces(
  filters?: IFilter,
  config?: UseQueryOptions<IPlace[]>
) {
  const params = {
    filter: filters,
    latitude: 36.74529209631143,
    longitude: 3.052477133545479,
  }
  return useQuery<IPlace[]>(['places', params], config)
}
