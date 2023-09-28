import { Text, View } from 'react-native'
import AppLayout from '../../app-layout'
import { NavigationProp } from '@react-navigation/native'

interface IPlaceDetailScreenProps {
  navigation: NavigationProp<any>
}

const PlaceDetailScreen: React.FC<IPlaceDetailScreenProps> = ({
  navigation,
}) => {
  return (
    <AppLayout navigation={navigation}>
      <Text>place detail</Text>
    </AppLayout>
  )
}

export default PlaceDetailScreen
