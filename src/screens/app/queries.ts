import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { IPlace, ITown, IWilaya } from './types'
import { ICategory } from './dashboard/main-stack/home/sections/nearby/types'
import { IFilter } from '../../hooks/useFilters'
import api from '../../service/api'

export function useWilayas(config?: UseQueryOptions<IWilaya[]>) {
  return useQuery<IWilaya[]>(['wilayas'], {
    ...config,
    select(res: any) {
      return res.data
    },
  })
}

export function useTowns(wilayaId: string, config?: UseQueryOptions<ITown[]>) {
  return useQuery<ITown[]>(['towns', wilayaId], {
    ...config,
    select(res: any) {
      return res.data
    },
  })
}

export function useCategories(config?: UseQueryOptions<ICategory[]>) {
  return useQuery<ICategory[]>(['categories'], {
    ...config,
    select(res: any) {
      return res.data
    },
  })
}

export function usePlacesNearby(
  filters: IFilter,
  config?: UseQueryOptions<IPlace[]>
) {
  const params = {
    filter: {
      ...filters,
      range: {
        latitude: 36.74529209631143,
        longitude: 3.052477133545479,
      },
    },
  }
  return useQuery<IPlace[]>(['places', 'nearby', params], {
    ...config,
    select(res: any) {
      return res.data
    },
  })
}

interface IUsePlacesResponse {
  data: IPlace[]
  meta: {
    next_page: number
    current_page: number
    last_page: number
  }
}

export function usePlaces(
  count?: number,
  filters?: IFilter,
  config?: UseInfiniteQueryOptions<IUsePlacesResponse>
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
  return useInfiniteQuery<IUsePlacesResponse>(['places', params], config)
}

export function usePlace(placeId: string, config?: UseQueryOptions<IPlace>) {
  const params = {
    filter: {
      range: {
        latitude: 36.74529209631143,
        longitude: 3.052477133545479,
      },
    },
  }
  return useQuery<IPlace>(['places', placeId, params], {
    ...config,
    select(res: any) {
      return res.data
    },
  })
}

export function useUpdateRating(
  id?: string,
  config?: UseMutationOptions<unknown, unknown, { rating: number }>
) {
  const queryClient = useQueryClient()
  return useMutation<unknown, unknown, { rating: number }>(
    (data) => api.post(`places/${id}/rating`, data),
    {
      ...config,
      onSuccess() {
        queryClient.invalidateQueries(['places'])
      },
    }
  )
}