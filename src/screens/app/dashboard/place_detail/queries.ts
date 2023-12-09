import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import api from '../../../../service/api'

export function useAddLike(
  config?: UseMutationOptions<unknown, unknown, string>
) {
  const queryClient = useQueryClient()
  return useMutation<unknown, unknown, string>(
    (id) => api.post(`likes/PLACE/${id}`),
    {
      onSuccess() {
        queryClient.invalidateQueries(['places'])
      },
      ...config,
    }
  )
}
