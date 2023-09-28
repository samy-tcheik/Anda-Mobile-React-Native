import { Text } from 'react-native'
import AppLayout from '../app-layout'
import { NavigationProp } from '@react-navigation/native'

interface IHistoryScreenProps {
  navigation: NavigationProp<any>
}

const HistoryScreen: React.FC<IHistoryScreenProps> = ({ navigation }) => {
  return (
    <AppLayout navigation={navigation}>
      <Text>HistoryScreen</Text>
    </AppLayout>
  )
}

export default HistoryScreen
