import HomeScreen from './home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FavoriteScreen from './favorites'
import DiscoverScreen from './discover'
import Icon from '../../../../components/icon'
import SettingsStackScreen from '../../settings'

const BottomTabs = createBottomTabNavigator()

const MainStackScreen: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          marginHorizontal: 20,
          marginVertical: 20,
          borderRadius: 50,
          position: 'absolute',
        },
      }}
    >
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Icon name="home" /> : <Icon name="home-outline" />,
        }}
        name="home"
        component={HomeScreen}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Icon name="compass" /> : <Icon name="compass-outline" />,
        }}
        name="discover"
        //passing inline function in component attribute to destroy screen when unfocus
        component={(props: any) => <DiscoverScreen {...props} />}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Icon name="heart" /> : <Icon name="heart-outline" />,
        }}
        name="favorite"
        component={FavoriteScreen}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Icon name="cog" /> : <Icon name="cog-outline" />,
        }}
        name="settings"
        component={SettingsStackScreen}
      />
    </BottomTabs.Navigator>
  )
}

export default MainStackScreen
