import { UseQueryOptions, useQuery } from '@tanstack/react-query'

interface IContactUsResponse {
  content: string
}

export function useContactUs(config?: UseQueryOptions<IContactUsResponse>) {
  return useQuery({ queryKey: ['page', 'contact-us'], ...config })
}
