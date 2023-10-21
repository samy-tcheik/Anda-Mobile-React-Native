import { MutationOptions, useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '.'
import { ILoginForm } from '../../screens/auth/login/type'
import api from '../../service/api'
import { LoginResponse } from './type'
import { dispatchLoggedInEvent, dispatchLoggedOutEvent } from './utils'

export function useLogin(
  config?: MutationOptions<LoginResponse, any, ILoginForm>
) {
  const { login }: any = useContext(AuthContext)
  return useMutation<LoginResponse, any, ILoginForm>(
    (data: ILoginForm) => api.post('auth/login', data),
    {
      onSuccess: ({ bearer }) => {
        dispatchLoggedInEvent(bearer)
        login(bearer)
      },
      meta: { handleError: false },
      ...config,
    }
  )
}

export function useLogout() {
  const { logout }: any = useContext(AuthContext)
  return async () => {
    await api.post('auth/logout')
    logout()
    dispatchLoggedOutEvent()
  }
}
