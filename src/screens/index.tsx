import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AuthProvider from '../providers/auth'
import IntroSlider from './Intro'
import { NavigationContainer } from '@react-navigation/native'

const MainStack = createNativeStackNavigator()

const MainAppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="intro" component={IntroSlider} />
        <MainStack.Screen name="auth-provider" component={AuthProvider} />
      </MainStack.Navigator>
    </NavigationContainer>
  )
}

export default MainAppStack
