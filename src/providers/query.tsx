import React from 'react'
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { showMessage } from 'react-native-flash-message'
import api from '../service/api'
import { dispatchLoggedOutEvent } from './auth/utils'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Alert } from 'react-native'

const queryClient = (authContext: any) =>
  new QueryClient({
    mutationCache: new MutationCache({
      onSuccess(_, __, ___, mutation) {
        const meta = mutation.options.meta
        let message: string = ''
        switch (true) {
          case !!meta?.message:
            message = meta?.message as string
            break
          case !!meta?.entity:
            message = 'Success'
            break
        }

        if (message) {
          showMessage({
            message: message,
            type: 'info',
          })
        }
      },
      onError(error: any, __, ___, mutation) {
        const meta = mutation.options.meta
        switch (true) {
          case meta?.handleError !== false && error.response.status !== 422:
            showMessage({
              message: `unexpected error: ${error.response.message}`,
              type: 'danger',
              icon: (props: any) => (
                <Icon name="alert-circle" color="white" size={20} {...props} />
              ),
            } as any)
            break
          case error.response.status === 401:
            dispatchLoggedOutEvent()
            break
          case error.response.status === 400:
            Alert.alert('Error', 'Please enable geolocation on your device', [
              {
                text: 'Continue',
                onPress: () => console.log('OK Pressed'),
              },
            ])
        }
      },
    }),
    defaultOptions: {
      queries: {
        queryFn: ({ signal, queryKey, pageParam = 1 }) => {
          const params = queryKey
            .filter((key) => typeof key === 'object')
            .reduce((acc: any, current: any) => ({ ...acc, ...current }), {})
          return api
            .get(
              queryKey
                .filter(
                  (key) => typeof key === 'string' || typeof key === 'number'
                )
                .join('/') + `?page=${pageParam}`,
              {
                params,
                signal,
              }
            )
            .then((res) => res.data)
        },
        retry: (failures, error: any) => {
          error.response?.status === 404 && false
          return failures <= 3
        },
        onError(error: any) {
          if (error.response.status === 401) {
            authContext.logout()
          }
          if (error.response.status === 400) {
            console.log('error 400')
            Alert.alert(
              'Error',
              'Veuillez activer la geolocalisation sur votre appareil',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            )
          }
        },
        useErrorBoundary: (error: any) => {
          return error.response.status === 404
        },
        //   notifyOnChangeProps: 'tracked',
      },
    },
  })

interface Props {
  children: React.ReactNode
  authContext: any
}

const QueryProvider: React.FC<Props> = ({ children, authContext }) => {
  return (
    <QueryClientProvider client={queryClient(authContext)}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider
