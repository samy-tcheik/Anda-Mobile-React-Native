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
  const params = {
    filter: {
      range: {
        latitude: 36.74529209631143,
        longitude: 3.052477133545479,
      },
    },
  }
  return useInfiniteQuery<IUseHistoryResponse>(['history', params], config)
}
