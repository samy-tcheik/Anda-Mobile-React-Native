import { NavigationProp } from '@react-navigation/native'
import { Text, View } from 'react-native'
import AppLayout from '../../app-layout'

interface IProfileScreenProps {
  navigation: NavigationProp<any>
}

const ProfileScreen: React.FC<IProfileScreenProps> = ({ navigation }) => {
  return (
    <AppLayout navigation={navigation}>
      <Text>Profile screen</Text>
    </AppLayout>
  )
}

export default ProfileScreen
