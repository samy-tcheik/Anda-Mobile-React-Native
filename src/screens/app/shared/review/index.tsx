import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReviewListScreen from './list'
import CreateReviewScreen from './create'
import ReviewSuccess from './success'

const ReviewStack = createNativeStackNavigator()

const ReviewStackScreen: React.FC = () => {
  return (
    <ReviewStack.Navigator screenOptions={{ headerShown: false }}>
      <ReviewStack.Screen name="review-list" component={ReviewListScreen} />
      <ReviewStack.Screen name="create-review" component={CreateReviewScreen} />
      <ReviewStack.Screen name="review-success" component={ReviewSuccess} />
    </ReviewStack.Navigator>
  )
}

export default ReviewStackScreen
