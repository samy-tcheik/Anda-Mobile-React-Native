import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import api from '../../../service/api'
import { IRegisterForm } from './type'

export function useRegister(
  config?: UseMutationOptions<any, any, IRegisterForm>
) {
  return useMutation<any, any, IRegisterForm>(
    (data) => api.post('auth/register', data),
    config
  )
}
