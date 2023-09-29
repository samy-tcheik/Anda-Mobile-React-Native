import HomeScreen from './home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from './profile'
import FavoriteScreen from './favorites'
import DiscoverScreen from './discover'
import Icon from '../../../../components/icon'

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
        component={DiscoverScreen}
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
            focused ? <Icon name="account" /> : <Icon name="account-outline" />,
        }}
        name="profile"
        component={ProfileScreen}
      />
    </BottomTabs.Navigator>
  )
}

export default MainStackScreen
