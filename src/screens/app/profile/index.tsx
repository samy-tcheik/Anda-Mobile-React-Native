import { Text } from 'react-native'
import AppLayout from '../app-layout'
import { NavigationProp } from '@react-navigation/native'

interface ISettingsScreenProps {
  navigation: NavigationProp<any>
}

const ProfileScreen: React.FC<ISettingsScreenProps> = ({ navigation }) => {
  return (
    <AppLayout navigation={navigation}>
      <Text>Profile screen</Text>
    </AppLayout>
  )
}

export default ProfileScreen
