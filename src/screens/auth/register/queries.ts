import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import api from '../../../service/api'
import { IRegisterForm } from './type'
import { AxiosError } from 'axios'

export function useRegister(
  config?: UseMutationOptions<any, AxiosError, IRegisterForm>
) {
  return useMutation<any, AxiosError, IRegisterForm>(
    (data) => api.post('auth/register', data),
    config
  )
}
