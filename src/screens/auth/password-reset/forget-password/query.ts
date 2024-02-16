import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import api from '../../../../service/api'
import { IForgetPasswordForm } from './use-form'

export function useForgetPassword(
  config?: UseMutationOptions<unknown, unknown, IForgetPasswordForm>
) {
  return useMutation<unknown, unknown, IForgetPasswordForm>(
    (data) => api.post('auth/forget-password', data),
    config
  )
}
