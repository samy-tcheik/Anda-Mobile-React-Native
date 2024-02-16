import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import api from '../../../../service/api'
import { IResetPasswordForm } from './use-form'

export interface IResetPasswordRequest extends IResetPasswordForm {
  code: string
}

export function useResetPassword(
  config?: UseMutationOptions<unknown, unknown, IResetPasswordRequest>
) {
  return useMutation<unknown, unknown, IResetPasswordRequest>(
    (data) => api.post('auth/reset-password', data),
    config
  )
}
