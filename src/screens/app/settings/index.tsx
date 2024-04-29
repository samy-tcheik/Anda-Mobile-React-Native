import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from './profile'
import SettingsScreen from './main'
import { NavigationProp, RouteProp } from '@react-navigation/native'

interface Props {
  route: RouteProp<any>
}

const SettingsStack = createNativeStackNavigator()

const SettingsStackScreen: React.FC<Props> = ({ route }) => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen
        component={SettingsScreen}
        //passign params to handle settings screen goBack button
        initialParams={route.params}
        name="settings_main"
      />
      <SettingsStack.Screen component={ProfileScreen} name="profile" />
    </SettingsStack.Navigator>
  )
}

export default SettingsStackScreen
