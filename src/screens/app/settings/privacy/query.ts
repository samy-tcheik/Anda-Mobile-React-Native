import { UseQueryOptions, useQuery } from '@tanstack/react-query'

interface IPrivacyResponse {
  content: string
}

export function usePrivacy(config?: UseQueryOptions<IPrivacyResponse>) {
  return useQuery({ queryKey: ['page', 'privacy'], ...config })
}
