// import React from 'react';
import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useCallback, useContext } from 'react'
import { AuthContext } from '.'
import { ILoginForm } from '../../screens/auth/login/type'
import api from '../../service/api'
import { IUser, LoginResponse } from './type'
import User from './user'
import { dispatchLoggedInEvent, dispatchLoggedOutEvent } from './utils'

export function useLogin(
  config?: MutationOptions<LoginResponse, AxiosError, ILoginForm>
) {
  const { login }: any = useContext(AuthContext)
  return useMutation<LoginResponse, AxiosError, ILoginForm>(
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
