import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LoginScreen from './login'
import RegisterScreen from './register'
import ForgetPasswordScreen from './forget-password'

const AuthStack = createNativeStackNavigator()

const AuthStackScreen: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="register" component={RegisterScreen} />
      <AuthStack.Screen
        name="forget-password"
        component={ForgetPasswordScreen}
      />
    </AuthStack.Navigator>
  )
}

export default AuthStackScreen
