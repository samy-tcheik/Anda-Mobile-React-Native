import { ScrollView } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import ExploreSection from './sections/explore'
import NearbySection from './sections/nearby'
import AppLayout from '../../../app-layout'
import SearchBar from '../../../../../components/searchBar'
import { useHome } from './queries'
import Loader from '../../../../../components/loader'
import { useState } from 'react'

interface IHomeScreenProps extends DrawerScreenProps<any> {}

const HomeScreen: React.FC<IHomeScreenProps> = ({ navigation }) => {
  const { data, isLoading } = useHome()
  const [search, setSearch] = useState<string>('')
  return (
    <AppLayout showWelcome navigation={navigation}>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <SearchBar
            onChangeText={setSearch}
            value={search}
            onSubmitEditing={() =>
              navigation.navigate('discover', {
                search: {
                  name: search,
                },
              })
            }
          />
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
