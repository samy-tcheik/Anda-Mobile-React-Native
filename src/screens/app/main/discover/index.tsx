import { Text } from '@rneui/base'
import { View } from 'react-native'
import AppLayout from '../../app-layout'
import { NavigationProp } from '@react-navigation/native'

interface IDiscoverScreenProps {
  navigation: NavigationProp<any>
}

const DiscoverScreen: React.FC<IDiscoverScreenProps> = ({ navigation }) => {
  return (
    <AppLayout navigation={navigation}>
      <Text>Discover screen</Text>
    </AppLayout>
  )
}

export default DiscoverScreen
