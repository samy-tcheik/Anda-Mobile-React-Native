import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ForgetPasswordScreen from './forget-password'
import EmailSent from './email-sent'
import CodeCheckScreen from './code-check'
import ResetPasswordScreen from './reset-password'
import ResetPasswordSuccess from './reset-password-success'

const ForgetPasswordStack = createNativeStackNavigator()

const ForgetPasswordStackScreen: React.FC = () => {
  return (
    <ForgetPasswordStack.Navigator screenOptions={{ headerShown: false }}>
      <ForgetPasswordStack.Screen
        name="forget-password"
        component={ForgetPasswordScreen}
      />
      <ForgetPasswordStack.Screen name="email-sent" component={EmailSent} />
      <ForgetPasswordStack.Screen
        name="code-check"
        component={CodeCheckScreen}
      />
      <ForgetPasswordStack.Screen
        name="reset-password"
        component={ResetPasswordScreen}
      />
      <ForgetPasswordStack.Screen
        name="reset-password-success"
        component={ResetPasswordSuccess}
      />
    </ForgetPasswordStack.Navigator>
  )
}

export default ForgetPasswordStackScreen
