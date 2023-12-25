import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { IHistory } from './types'

interface IUseHistoryResponse {
  data: IHistory[]
  meta: {
    next_page: number
    current_page: number
    last_page: number
  }
}

export function useHistory(
  config?: UseInfiniteQueryOptions<IUseHistoryResponse>
) {
  return useInfiniteQuery<IUseHistoryResponse>(['history'], config)
}
