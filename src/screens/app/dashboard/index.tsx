import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainStackScreen from './main-stack'
import ReviewStackScreen from '../shared/review'
import PlaceDetailStackScreen from './place_detail'

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
        component={PlaceDetailStackScreen}
      />
      <DashboardStack.Screen name="review" component={ReviewStackScreen} />
    </DashboardStack.Navigator>
  )
}

export default DashboardStackScreen
