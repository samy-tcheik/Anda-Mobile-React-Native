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
  return useInfiniteQuery<IUseLikeResponse>(['likes'], config)
}
