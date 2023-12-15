import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PlaceDetailScreen from './place_detail'
import MainStackScreen from './main-stack'
import CommentsScreen from './comments'

const DashboardStack = createNativeStackNavigator()

const DashboardStackScreen: React.FC = () => {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen
        name="dashboard_main"
        component={MainStackScreen}
      />
      <DashboardStack.Screen
        name="place_detail"
        component={PlaceDetailScreen}
      />
      <DashboardStack.Screen name="comments" component={CommentsScreen} />
    </DashboardStack.Navigator>
  )
}

export default DashboardStackScreen
