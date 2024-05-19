import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import {
  ICategory,
  IPlace,
  IPlaceDetail,
  ITown,
  IWilaya,
  LikeType,
} from './types'
import api from '../../service/api'

export function useWilayas(config?: UseQueryOptions<IWilaya[]>) {
  return useQuery<IWilaya[]>({
    queryKey: ['wilayas'],
    ...config,
    select(res: any) {
      return res.data
    },
  })
}

export function useTowns(wilayaId: string, config?: UseQueryOptions<ITown[]>) {
  return useQuery<ITown[]>({
    queryKey: ['towns', wilayaId],
    ...config,
    select(res: any) {
      return res.data
    },
  })
}

export function useCategories(config?: UseQueryOptions<ICategory[]>) {
  return useQuery<ICategory[]>({
    queryKey: ['categories'],
    ...config,
    select(res: any) {
      return res.data
    },
  })
}

// export function usePlacesNearby(
//   filters: IFilter,
//   config?: UseQueryOptions<IPlace[]>
// ) {
//   const params = {
//     filter: filters,
//   }
//   return useQuery<IPlace[]>(['places', 'nearby', params], {
//     ...config,
//     select(res: any) {
//       return res.data
//     },
//   })
// }

interface IUsePlacesResponse {
  data: IPlace[]
  meta: {
    next_page: number
    current_page: number
    last_page: number
    to: number
    total: number
  }
}

export function usePlaces(
  count?: number,
  filters?: any,
  config?: UseInfiniteQueryOptions<IUsePlacesResponse>
) {
  const params = {
    count: count,
    filter: filters,
  }
  return useInfiniteQuery<IUsePlacesResponse>({
    queryKey: ['places', params],
    ...config,
  })
}

export function usePlace(
  placeId: string,
  config?: UseQueryOptions<IPlaceDetail>
) {
  const queryClient = useQueryClient()
  return useQuery<IPlaceDetail>({
    queryKey: ['places', placeId],
    ...config,
    select(res: any) {
      queryClient.invalidateQueries({ queryKey: ['history'] })
      return res.data
    },
  })
}

export function useAddLike(
  type: LikeType,
  config?: UseMutationOptions<unknown, unknown, string>
) {
  const queryClient = useQueryClient()
  return useMutation<unknown, unknown, string>({
    mutationFn: (id) => api.post(`likes/${type}/${id}`),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['places'] })
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
      queryClient.invalidateQueries({ queryKey: ['likes'] })
    },
    ...config,
  })
}
