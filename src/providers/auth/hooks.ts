import { MutationOptions, useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '.'
import {
  IFacebookLoginRequest,
  IGoogleLoginRequest,
  ILoginForm,
} from '../../screens/auth/login/type'
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

export function useFacebookLogin(
  config?: MutationOptions<LoginResponse, any, IFacebookLoginRequest>
) {
  const { login }: any = useContext(AuthContext)
  return useMutation<LoginResponse, any, IFacebookLoginRequest>(
    (data) => api.post('auth/facebook/login', data),
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

export function useGoogleLogin(
  config?: MutationOptions<LoginResponse, any, IGoogleLoginRequest>
) {
  const { login }: any = useContext(AuthContext)
  return useMutation<LoginResponse, any, IGoogleLoginRequest>(
    (data) => api.post('auth/google/login', data),
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
    await api.post('auth/logout').catch(() => {
      logout()
      dispatchLoggedOutEvent()
    })
    logout()
    dispatchLoggedOutEvent()
  }
}
