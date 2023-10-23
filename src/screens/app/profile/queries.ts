import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import api from '../../../service/api'
import { IUser } from '../../../providers/auth/type'

export function useUpdateAvatar(
  config?: UseMutationOptions<any, any, FormData>
) {
  const queryClient = useQueryClient()
  return useMutation<any, any, FormData>(
    (data) =>
      api.post('user/update-avatar', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    {
      ...config,
      onSuccess() {
        queryClient.invalidateQueries(['user'])
      },
    }
  )
}

export function useAuthUser(config?: UseQueryOptions<IUser>) {
  return useQuery<IUser>(['user'], config)
}
