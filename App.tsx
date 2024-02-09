/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react'
import AuthProvider from './src/providers/auth'
import FlashMessage from 'react-native-flash-message'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from './src/service/i18n'
import { getLocales } from 'react-native-localize'
import { focusManager } from '@tanstack/react-query'
import { AppState, AppStateStatus } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

// GoogleSignin.configure()

const App: React.FC = () => {
  //refetch on app focus
  function onAppStateChange(status: AppStateStatus) {
    focusManager.setFocused(status === 'active')
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)

    return () => subscription.remove()
  }, [])

  const setDefaultLanguage = async () => {
    const lang = await AsyncStorage.getItem('language')
    const deviceLang = getLocales()[0].languageCode
    i18n.changeLanguage(lang ?? deviceLang)
  }
  useEffect(() => {
    setDefaultLanguage()
  }, [])

  i18n.on('languageChanged', (lang) => {})
  return (
    <SafeAreaProvider>
      <AuthProvider />
      <FlashMessage position="bottom" />
    </SafeAreaProvider>
  )
}

export default App
