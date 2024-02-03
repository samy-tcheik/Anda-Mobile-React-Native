import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from './profile'
import SettingsScreen from './main'

const SettingsStack = createNativeStackNavigator()

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen component={SettingsScreen} name="settings_main" />
      <SettingsStack.Screen component={ProfileScreen} name="profile" />
    </SettingsStack.Navigator>
  )
}

export default SettingsStackScreen
