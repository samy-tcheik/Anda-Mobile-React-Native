import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  useInfiniteQuery,
  useMutation,
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

export function useComments(
  id: string,
  config?: UseInfiniteQueryOptions<IUseCommentResponse>
) {
  return useInfiniteQuery<IUseCommentResponse>(['comments', id], config)
}

export function useAddComment(
  id: string,
  config?: UseMutationOptions<ICommentForm>
) {
  return useMutation((data) => api.post(`comments/${id}`), config)
}
