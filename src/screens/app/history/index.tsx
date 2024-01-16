import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HistoryScreen from './list'
import PlaceDetailScreen from '../dashboard/place_detail'

const HistoryNavigator = createNativeStackNavigator()

const HistoryStack: React.FC = () => {
  return (
    <HistoryNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HistoryNavigator.Screen name="history_list" component={HistoryScreen} />
      <HistoryNavigator.Screen
        name="history_detail"
        component={PlaceDetailScreen}
      />
    </HistoryNavigator.Navigator>
  )
}

export default HistoryStack
