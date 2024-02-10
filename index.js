/**
 * @format
 */
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import './src/service/i18n'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { GOOGLE_CLIENT_ID } from './src/global'

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
})

AppRegistry.registerComponent(appName, () => App)
