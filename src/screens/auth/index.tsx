import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import LoginScreen from './login'
import RegisterScreen from './register'
import ForgetPasswordStackScreen from './password-reset'
import IntroSlider from './Intro'

const AuthStack = createNativeStackNavigator()

const AuthStackScreen: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Intro" component={IntroSlider} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="register" component={RegisterScreen} />
      <AuthStack.Screen
        name="forget-password-stack"
        component={ForgetPasswordStackScreen}
      />
    </AuthStack.Navigator>
  )
}

export default AuthStackScreen
