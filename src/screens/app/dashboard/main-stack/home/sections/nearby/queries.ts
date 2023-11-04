import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { ICategory, ITown, IWilaya } from './types'
import { IFilter } from '../../../../../../../hooks/useFilters'

export function useWilayas(config?: UseQueryOptions<IWilaya[]>) {
  return useQuery<IWilaya[]>(['wilayas'], config)
}

export function useTowns(wilayaId: string, config?: UseQueryOptions<ITown[]>) {
  return useQuery<ITown[]>(['towns', wilayaId], config)
}

export function useCategories(config?: UseQueryOptions<ICategory[]>) {
  return useQuery<ICategory[]>(['categories'], config)
}

export function usePlaces(
  count?: number,
  filters?: IFilter,
  config?: UseQueryOptions<IPlace[]>
) {
  const params = {
    count: count,
    filter: {
      ...filters,
      range: {
        range: filters?.range,
        latitude: 36.74529209631143,
        longitude: 3.052477133545479,
      },
    },
  }
  console.log('params', params)
  return useQuery<IPlace[]>(['places', params], config)
}
