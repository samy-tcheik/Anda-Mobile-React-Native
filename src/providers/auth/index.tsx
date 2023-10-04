import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useEffect } from 'react'
import { createContext, useMemo } from 'react'
import AppStackScreen from '../../screens/app'
import AuthStackScreen from '../../screens/auth'
import QueryProvider from '../query'
import { dispatchLoggedInEvent, dispatchLoggedOutEvent } from './utils'

interface AuthContextProps {
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
)

const RootStack = createNativeStackNavigator()

const AuthProvider: React.FC = () => {
  const initialLoginState = {
    isLoading: true,
    token: null,
    user: null,
  }

  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...prevState,
          token: null,
          user: null,
          isLoading: false,
        }
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
        }
    }
  }

  useEffect(() => {
    const retrieveToken = async () => {
      let token
      try {
        token = await AsyncStorage.getItem('user_token')
      } catch (e) {
        console.warn('restore token failed')
      }
      dispatch({ type: 'RESTORE_TOKEN', token: token })
    }
    retrieveToken()
  }, [])

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  )

  const authContext = useMemo(
    () => ({
      login: (token: string) => {
        dispatchLoggedInEvent(token)
        dispatch({ type: 'LOGIN', token: token })
      },
      logout: () => {
        dispatchLoggedOutEvent()
        dispatch({ type: 'LOGOUT' })
      },
    }),
    []
  )
  return (
    <AuthContext.Provider value={authContext}>
      <QueryProvider authContext={authContext}>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {loginState.token ? (
              <RootStack.Screen name="App" component={AppStackScreen} />
            ) : (
              <RootStack.Screen name="Auth" component={AuthStackScreen} />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </QueryProvider>
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const auth = useContext(AuthContext)
  if (auth === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return auth
}

export default AuthProvider
