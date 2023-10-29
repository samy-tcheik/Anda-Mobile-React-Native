import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { ICategory, IWilaya } from './types'

export function useWilayas(config?: UseQueryOptions<IWilaya[]>) {
  return useQuery<IWilaya[]>(['wilaya'], config)
}

export function useCategories(config?: UseQueryOptions<ICategory[]>) {
  return useQuery<ICategory[]>(['categories'], config)
}
