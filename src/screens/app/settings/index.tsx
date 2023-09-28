import { Text } from 'react-native'
import AppLayout from '../app-layout'
import { NavigationProp } from '@react-navigation/native'

interface ISettingsScreenProps {
  navigation: NavigationProp<any>
}

const SettingsScreen: React.FC<ISettingsScreenProps> = ({ navigation }) => {
  return (
    <AppLayout navigation={navigation}>
      <Text>Settings screen</Text>
    </AppLayout>
  )
}

export default SettingsScreen
