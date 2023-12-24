import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { ICommentForm } from './use-form'
import api from '../../../../service/api'
import { IComment } from './type'

interface IUseCommentResponse {
  data: IComment[]
  meta: {
    next_page: number
    current_page: number
    last_page: number
  }
}

export enum ICommentType {
  PLACE = 'PLACE',
}

export function useComments(
  id: string,
  type: ICommentType,
  config?: UseInfiniteQueryOptions<IUseCommentResponse>
) {
  return useInfiniteQuery<IUseCommentResponse>(['comments', type, id], config)
}

export function useAddComment(
  id: string,
  type: ICommentType,
  config?: UseMutationOptions<unknown, unknown, ICommentForm>
) {
  const queryClient = useQueryClient()

  return useMutation<unknown, unknown, ICommentForm>(
    (data) => api.post(`comments/${type}/${id}`, data),
    {
      ...config,
      onSuccess() {
        queryClient.invalidateQueries(['comments', type, id])
        queryClient.invalidateQueries(['places', id])
      },
    }
  )
}
