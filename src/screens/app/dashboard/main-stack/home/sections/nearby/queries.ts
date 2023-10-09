import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { IWilaya } from './types'

export function useWilayas(config?: UseQueryOptions<IWilaya[]>) {
  return useQuery<IWilaya[]>(['wilaya'], config)
}
