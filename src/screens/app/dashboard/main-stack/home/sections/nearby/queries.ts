import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { ICategory } from './types'
import { IFilter } from '../../../../../../../hooks/useFilters'
import { IPlace, ITown, IWilaya } from '../../../../../types'
import { getLocation } from '../../../../../../../hooks/useLocation'

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
        range: filters?.range || '',
        latitude: 36.74529209631143,
        longitude: 3.052477133545479,
      },
    },
  }
  return useQuery<IPlace[]>(['places', params], config)
}
