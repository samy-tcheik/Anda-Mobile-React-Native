import MainScreen from './dashboard'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import Icon from '../../components/icon'
import { useLogout, useProfile } from '../../providers/auth/hooks'
import { useTranslation } from 'react-i18next'
import SettingsStackScreen from './settings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from '../../service/i18n'
import { useContext, useEffect } from 'react'
import HistoryStack from './history'
import { AuthContext } from '../../providers/auth'
import { View } from 'react-native'
import { Avatar } from '@rneui/base'
import Typography from '../../components/text'

const Drawer = createDrawerNavigator()

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const logout = useLogout()
  const { t } = useTranslation()
  const authContext = useContext(AuthContext)

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          width: '100%',
          height: 100,
        }}
      >
        <Avatar
          size={70}
          // onPress={() =>
          //   (navigation as any).navigate('settings', { screen: 'profile' })
          // }
          rounded
          title={
            !authContext?.state.user?.avatar
              ? authContext?.state?.user?.name.charAt(0)
              : undefined
          }
          containerStyle={
            !authContext?.state.user?.avatar
              ? {
                  backgroundColor: '#3d4db7',
                  borderRadius: 150,
                  marginRight: 20,
                }
              : undefined
          }
          source={
            authContext?.state.user?.avatar
              ? { uri: authContext.state.user.avatar }
              : undefined
          }
        />
        <View>
          <Typography.BodyHeavy>
            {authContext?.state.user?.name}
          </Typography.BodyHeavy>
          <Typography.CaptionLight>
            {authContext?.state.user?.email}
          </Typography.CaptionLight>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        icon={() => <Icon name="logout" />}
        label={t('common:logout')}
        onPress={logout}
      />
    </DrawerContentScrollView>
  )
}

const AppStackScreen: React.FC = () => {
  const authContext = useContext(AuthContext)
  const {} = useProfile({
    //to prevent calls when first login
    enabled: !authContext?.state.user,
  })
  useEffect(() => {
    AsyncStorage.setItem('language', i18n.language)
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
