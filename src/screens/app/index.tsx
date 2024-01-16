import MainScreen from './dashboard'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import Icon from '../../components/icon'
import { useLogout } from '../../providers/auth/hooks'
import { useTranslation } from 'react-i18next'
import SettingsStackScreen from './settings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from '../../service/i18n'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import HistoryStack from './history'

const Drawer = createDrawerNavigator()

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const logout = useLogout()
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={() => <Icon name="logout" />}
        label="logout"
        onPress={logout}
      />
    </DrawerContentScrollView>
  )
}

const AppStackScreen: React.FC = () => {
  const queryClient = useQueryClient()
  useEffect(() => {
    AsyncStorage.setItem('language', i18n.language)
    queryClient.resetQueries()
  }, [i18n.language])

  const { t } = useTranslation()
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="main"
        options={{
          title: t('common:home'),
          drawerIcon: ({ focused }) =>
            focused ? <Icon name="home" /> : <Icon name="home-outline" />,
        }}
        component={MainScreen}
      />
      <Drawer.Screen
        name="history"
        options={{
          title: t('common:history'),
          drawerIcon: () => <Icon name="history" />,
        }}
        component={HistoryStack}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: t('common:settings'),
          drawerIcon: ({ focused }) =>
            focused ? <Icon name="cog" /> : <Icon name="cog-outline" />,
        }}
        component={SettingsStackScreen}
      />
    </Drawer.Navigator>
  )
}

export default AppStackScreen
