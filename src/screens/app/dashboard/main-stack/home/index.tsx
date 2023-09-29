import { View } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import ExploreSection from './sections/explore'
import NearbySection from './sections/nearby'
import AppLayout from '../../../app-layout'
import SearchBar from '../../../../../components/searchBar'

interface IHomeScreenProps extends DrawerScreenProps<any> {}

const HomeScreen: React.FC<IHomeScreenProps> = ({ navigation }) => {
  return (
    <AppLayout navigation={navigation}>
      <SearchBar />
      <View style={{ marginTop: 15 }}>
        <ExploreSection navigation={navigation as any} />
        <NearbySection navigation={navigation as any} />
      </View>
    </AppLayout>
  )
}

export default HomeScreen
