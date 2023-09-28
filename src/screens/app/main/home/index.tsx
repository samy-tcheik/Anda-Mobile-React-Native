import { Text } from 'react-native'
import Background from '../../../../components/background'

import Header from '../../../../components/header'
import { DrawerScreenProps } from '@react-navigation/drawer'
import SearchBar from '../../../../components/searchBar'
import AppLayout from '../../app-layout'

interface IHomeScreenProps extends DrawerScreenProps<any> {}

const HomeScreen: React.FC<IHomeScreenProps> = ({ navigation }) => {
  return (
    <AppLayout navigation={navigation}>
      <SearchBar />
      <Text>Home screen</Text>
    </AppLayout>
  )
}

export default HomeScreen
