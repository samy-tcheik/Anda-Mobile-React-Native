import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { IReview } from '../../types'
import { IReviewForm } from './use-form'
import api from '../../../../service/api'

interface IUseReviewsResponse {
  data: IReview[]
  meta: {
    next_page: number
    current_page: number
    last_page: number
    to: number
    total: number
  }
}

export function useReviews(
  model: string,
  modelId: string,
  config?: UseInfiniteQueryOptions<IUseReviewsResponse>
) {
  return useInfiniteQuery<IUseReviewsResponse>({
    queryKey: ['reviews', model, modelId],
    ...config,
  })
}

export function useUserReview(
  model: string,
  modelId: string,
  config?: UseQueryOptions<IReview>
) {
  return useQuery<IReview>({
    queryKey: ['reviews', 'user', model, modelId],
    ...config,
    select(res: any) {
      return res.data
    },
  })
}

export function useCreateUserReview(
  model: string,
  modelId: string,
  config?: UseMutationOptions<unknown, unknown, IReviewForm>
) {
  const queryClient = useQueryClient()
  return useMutation<unknown, unknown, IReviewForm>({
    mutationFn: (data) => api.post(`reviews/user/${model}/${modelId}`, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['places'] })
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
    ...config,
  })
}

export function useUpdateUserReview(
  model: string,
  modelId: string,
  config?: UseMutationOptions<unknown, unknown, IReviewForm>
) {
  const queryClient = useQueryClient()
  return useMutation<unknown, unknown, IReviewForm>({
    mutationFn: (data) => api.put(`reviews/user/${model}/${modelId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['places'] })
      queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
    ...config,
  })
}
