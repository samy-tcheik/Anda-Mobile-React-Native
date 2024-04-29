import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PlaceDetailScreen from './show'
import ReviewStackScreen from '../../shared/review'

const PlaceDetailStack = createNativeStackNavigator()

const PlaceDetailStackScreen: React.FC = () => {
  return (
    <PlaceDetailStack.Navigator screenOptions={{ headerShown: false }}>
      <PlaceDetailStack.Screen
        name="show_place"
        component={PlaceDetailScreen}
      />
      <PlaceDetailStack.Screen name="review" component={ReviewStackScreen} />
    </PlaceDetailStack.Navigator>
  )
}

export default PlaceDetailStackScreen
