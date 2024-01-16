import { ScrollView, Text, View } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import ExploreSection from './sections/explore'
import NearbySection from './sections/nearby'
import AppLayout from '../../../app-layout'
import SearchBar from '../../../../../components/searchBar'
import { useHome } from './queries'
import Loader from '../../../../../components/loader'

interface IHomeScreenProps extends DrawerScreenProps<any> {}

const HomeScreen: React.FC<IHomeScreenProps> = ({ navigation }) => {
  const { data, isLoading } = useHome()
  return (
    <AppLayout navigation={navigation}>
      <SearchBar />
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <ExploreSection
            data={data?.explore!}
            navigation={navigation as any}
          />
          <NearbySection data={data?.nearby!} navigation={navigation as any} />
        </ScrollView>
      )}
    </AppLayout>
  )
}

export default HomeScreen
