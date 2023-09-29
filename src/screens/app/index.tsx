import MainScreen from './dashboard'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import SettingsScreen from './settings'
import Icon from '../../components/icon'
import HistoryScreen from './history'

const Drawer = createDrawerNavigator()

const CustomDrawerConten: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={() => <Icon name="logout" />}
        label="logout"
        onPress={() => console.log('logout')}
      />
    </DrawerContentScrollView>
  )
}

const AppStackScreen: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerConten}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="main"
        options={{
          drawerIcon: ({ focused }) =>
            focused ? <Icon name="home" /> : <Icon name="home-outline" />,
        }}
        component={MainScreen}
      />
      <Drawer.Screen
        name="history"
        options={{
          drawerIcon: () => <Icon name="history" />,
        }}
        component={HistoryScreen}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerIcon: ({ focused }) =>
            focused ? <Icon name="cog" /> : <Icon name="cog-outline" />,
        }}
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  )
}

export default AppStackScreen
