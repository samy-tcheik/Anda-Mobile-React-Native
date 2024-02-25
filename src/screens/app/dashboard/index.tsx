import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PlaceDetailScreen from './place_detail'
import MainStackScreen from './main-stack'
import ReviewStackScreen from '../shared/review'

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
      <DashboardStack.Screen name="review" component={ReviewStackScreen} />
    </DashboardStack.Navigator>
  )
}

export default DashboardStackScreen
