import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { ILike } from './types'

interface IUseLikeResponse {
  data: ILike[]
  meta: {
    next_page: number
    current_page: number
    last_page: number
  }
}

export function useLikes(config?: UseInfiniteQueryOptions<IUseLikeResponse>) {
  const params = {
    filter: {
      range: {
        latitude: 36.74529209631143,
        longitude: 3.052477133545479,
      },
    },
  }

  return useInfiniteQuery<IUseLikeResponse>(['likes', params], config)
}
