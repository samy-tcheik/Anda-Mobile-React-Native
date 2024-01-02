import { ScrollView, Text, View } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import ExploreSection from './sections/explore'
import NearbySection from './sections/nearby'
import AppLayout from '../../../app-layout'
import SearchBar from '../../../../../components/searchBar'
import { useHome } from './queries'

interface IHomeScreenProps extends DrawerScreenProps<any> {}

const HomeScreen: React.FC<IHomeScreenProps> = ({ navigation }) => {
  const { data, isLoading } = useHome()
  return (
    <AppLayout navigation={navigation}>
      <SearchBar />
      <ScrollView>
        {isLoading ? (
          <Text>Is Loading</Text>
        ) : (
          <>
            <ExploreSection
              data={data?.explore!}
              navigation={navigation as any}
            />
            <NearbySection
              data={data?.nearby!}
              navigation={navigation as any}
            />
          </>
        )}
      </ScrollView>
    </AppLayout>
  )
}

export default HomeScreen
