import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import api from '../../../../service/api'
import { IUser } from '../../../../providers/auth/type'
import { useContext } from 'react'
import { AuthContext } from '../../../../providers/auth'
import { dispatchLoggedOutEvent } from '../../../../providers/auth/utils'

export function useUpdateAvatar(
  config?: UseMutationOptions<any, any, FormData>
) {
  const queryClient = useQueryClient()
  return useMutation<any, any, FormData>({
    mutationFn: (data) =>
      api.post('user/update-avatar', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    ...config,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export function useAuthUser(config?: UseQueryOptions<IUser>) {
  return useQuery<IUser>({
    queryKey: ['user'],
    ...config,
    select(data: any) {
      return data.data
    },
  })
}

export function useDeleteUser(config?: UseMutationOptions) {
  const { logout }: any = useContext(AuthContext)
  return useMutation({
    mutationFn: () => api.delete('/user'),
    ...config,
    onSuccess() {
      logout()
      dispatchLoggedOutEvent()
    },
  })
}

export function useUpdateUser(
  config?: UseMutationOptions<unknown, unknown, IUserForm>
) {
  const queryClient = useQueryClient()
  return useMutation<unknown, unknown, IUserForm>(
    (data) => api.patch('user/update', data),
    {
      ...config,
      onSuccess() {
        queryClient.invalidateQueries(['user'])
      },
    }
  )
}
