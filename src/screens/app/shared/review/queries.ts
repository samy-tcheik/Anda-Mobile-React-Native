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
  return useInfiniteQuery<IUseReviewsResponse>(
    ['reviews', model, modelId],
    config
  )
}

export function useUserReview(
  model: string,
  modelId: string,
  config?: UseQueryOptions<IReview>
) {
  return useQuery<IReview>(['reviews', 'user', model, modelId], {
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
  return useMutation<unknown, unknown, IReviewForm>(
    (data) => api.post(`reviews/user/${model}/${modelId}`, data),
    {
      ...config,
      onSuccess() {
        queryClient.invalidateQueries(['reviews'])
        queryClient.invalidateQueries(['places', modelId])
      },
    }
  )
}

export function useUpdateUserReview(
  model: string,
  modelId: string,
  config?: UseMutationOptions<unknown, unknown, IReviewForm>
) {
  const queryClient = useQueryClient()
  return useMutation<unknown, unknown, IReviewForm>(
    (data) => api.put(`reviews/user/${model}/${modelId}`, data),
    {
      ...config,
      onSuccess() {
        queryClient.invalidateQueries(['reviews'])
        queryClient.invalidateQueries(['places', modelId])
      },
    }
  )
}
