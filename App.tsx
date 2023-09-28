/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'

import AuthProvider from './src/providers/auth'
import FlashMessage from 'react-native-flash-message'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider />
      <FlashMessage position="bottom" />
    </SafeAreaProvider>
  )
}

export default App
