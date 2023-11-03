import { ScrollView, View } from 'react-native'
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
      <ScrollView>
        <ExploreSection navigation={navigation as any} />
        <NearbySection navigation={navigation as any} />
      </ScrollView>
    </AppLayout>
  )
}

export default HomeScreen
