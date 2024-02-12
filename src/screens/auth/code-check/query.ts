import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import api from '../../../service/api'
import { ICodeCheckForm } from './use-form'

export function useCodeCheck(
  config?: UseMutationOptions<unknown, unknown, ICodeCheckForm>
) {
  return useMutation<unknown, unknown, ICodeCheckForm>(
    (data) => api.post('auth/code-check', data),
    config
  )
}
