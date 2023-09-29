import { View } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import SearchBar from '../../../../components/searchBar'
import AppLayout from '../../app-layout'
import ExploreSection from './sections/explore'
import NearbySection from './sections/nearby'
import { Divider } from '@rneui/base'

interface IHomeScreenProps extends DrawerScreenProps<any> {}

const HomeScreen: React.FC<IHomeScreenProps> = ({ navigation }) => {
  return (
    <AppLayout navigation={navigation}>
      <SearchBar />
      <View style={{ marginTop: 15 }}>
        <ExploreSection />
        <NearbySection />
      </View>
    </AppLayout>
  )
}

export default HomeScreen
