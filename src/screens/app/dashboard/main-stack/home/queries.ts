import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { IHomeResponse } from './type'

export function useHome(config?: UseQueryOptions<IHomeResponse>) {
  return useQuery<IHomeResponse>({
    queryKey: ['places', 'home'],
    ...config,
    select(res: any) {
      console.log('========================================Refetchg')
      return res.data
    },
  })
}
