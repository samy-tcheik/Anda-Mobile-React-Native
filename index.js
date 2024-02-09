/**
 * @format
 */
import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import './src/service/i18n'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
  webClientId:
    '854684032677-tfe57u3aqchosfejdf8mctcaa5shf9l6.apps.googleusercontent.com',
})

AppRegistry.registerComponent(appName, () => App)
