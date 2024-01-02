import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { IHomeResponse } from './type'

export function useHome(config?: UseQueryOptions<IHomeResponse>) {
  return useQuery<IHomeResponse>(['places', 'home'], {
    ...config,
    select(res: any) {
      return res.data
    },
  })
}
