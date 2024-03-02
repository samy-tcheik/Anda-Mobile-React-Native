import { MutationOptions, useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '.'
import {
  IFacebookLoginRequest,
  IGoogleLoginRequest,
  ILoginForm,
} from '../../screens/auth/login/type'
import api from '../../service/api'
import { AuthDriver, LoginResponse } from './type'
import { dispatchLoggedInEvent, dispatchLoggedOutEvent } from './utils'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

export function useLogin(
  config?: MutationOptions<LoginResponse, any, ILoginForm>
) {
  const { login }: any = useContext(AuthContext)
  return useMutation<LoginResponse, any, ILoginForm>({
    mutationFn: (data: ILoginForm) => api.post('auth/login', data),
    onSuccess: (res) => {
      dispatchLoggedInEvent(res.bearer)
      login(res)
    },
    meta: { handleError: false },
    ...config,
  })
}

export function useFacebookLogin(
  config?: MutationOptions<LoginResponse, any, IFacebookLoginRequest>
) {
  const { login }: any = useContext(AuthContext)
  return useMutation<LoginResponse, any, IFacebookLoginRequest>({
    mutationFn: (data) => api.post('auth/facebook/login', data),
    onSuccess: (res) => {
      dispatchLoggedInEvent(res.bearer)
      login(res)
    },
    meta: { handleError: false },
    ...config,
  })
}

export function useGoogleLogin(
  config?: MutationOptions<LoginResponse, any, IGoogleLoginRequest>
) {
  const { login }: any = useContext(AuthContext)
  return useMutation<LoginResponse, any, IGoogleLoginRequest>({
    mutationFn: (data) => api.post('auth/google/login', data),
    onSuccess: (res) => {
      dispatchLoggedInEvent(res.bearer)
      login(res)
    },
    meta: { handleError: false },
    ...config,
  })
}

export function useLogout() {
  const { logout, state }: any = useContext(AuthContext)
  return async () => {
    await api
      .post('auth/logout')
      .then(() => {
        if (state.user.auth_driver === AuthDriver.GOOGLE) {
          GoogleSignin.signOut()
        }
        logout()
        dispatchLoggedOutEvent()
      })
      .catch(() => {
        logout()
        dispatchLoggedOutEvent()
      })
  }
}
