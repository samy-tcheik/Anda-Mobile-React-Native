import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext, useEffect } from 'react'
import { createContext, useMemo } from 'react'
import AppStackScreen from '../../screens/app'
import AuthStackScreen from '../../screens/auth'
import QueryProvider from '../query'
import { dispatchLoggedInEvent, dispatchLoggedOutEvent } from './utils'
import { IProfileResponse, IUser, LoginResponse } from './type'
import { NavigationContainer } from '@react-navigation/native'

interface AuthContextProps {
  login: (data: LoginResponse) => void
  logout: () => void
  retrieveUserInfo: (data: IProfileResponse) => void
  state: AuthState
}

interface AuthState {
  bearer: string
  user?: IUser
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
)

const RootStack = createNativeStackNavigator()

const AuthProvider: React.FC = () => {
  const initialLoginState = {
    isLoading: true,
    bearer: null,
    user: null,
  }

  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          bearer: action.data.bearer,
          user: action.data.user,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...prevState,
          bearer: null,
          user: null,
          isLoading: false,
        }
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          bearer: action.bearer,
          user: action.user,
          isLoading: false,
        }
      case 'RETRIEVE_USER_INFO':
        return {
          ...prevState,
          user: action.data,
          isLoading: false,
        }
    }
  }

  useEffect(() => {
    const retrieveToken = async () => {
      let bearer
      try {
        bearer = await AsyncStorage.getItem('user_token')
      } catch (e) {
        console.warn('restore token failed')
      }
      dispatch({ type: 'RESTORE_TOKEN', bearer: bearer })
    }
    retrieveToken()
  }, [])

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  )

  const authContext = useMemo(
    () => ({
      login: (data: LoginResponse) => {
        dispatchLoggedInEvent(data.bearer)
        dispatch({ type: 'LOGIN', data })
      },
      logout: () => {
        dispatchLoggedOutEvent()
        dispatch({ type: 'LOGOUT' })
      },
      retrieveUserInfo: (data: IProfileResponse) => {
        dispatch({ type: 'RETRIEVE_USER_INFO', data })
      },
    }),
    []
  )
  return (
    <AuthContext.Provider value={{ ...authContext, state: loginState }}>
      <QueryProvider authContext={authContext}>
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {loginState.bearer ? (
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
