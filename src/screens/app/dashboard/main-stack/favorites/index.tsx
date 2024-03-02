import { FlatList, View } from 'react-native'
import AppLayout from '../../../app-layout'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useLikes } from './queries'
import { RefreshControl } from 'react-native'
import ListItem from '../../../../../components/listItem'
import Loader from '../../../../../components/loader'

interface Props {
  navigation: BottomTabNavigationProp<any>
}

const FavoriteScreen: React.FC<Props> = ({ navigation }) => {
  const { data, isLoading, isRefetching, refetch, hasNextPage, fetchNextPage } =
    useLikes({
      getNextPageParam: (nextPage) => {
        if (nextPage.meta.current_page !== nextPage.meta.last_page) {
          return nextPage.meta.current_page + 1
        }
      },
    })

  const handleLoadMore = () => {
    console.log('handle load more')
    if (hasNextPage) {
      fetchNextPage()
    }
  }
  return (
    <AppLayout backButton navigation={navigation}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
            onEndReached={handleLoadMore}
            data={data?.pages.map((page) => page.data).flat()}
            renderItem={({ item }) => (
              <ListItem
                data={item.place}
                onPress={() =>
                  navigation.navigate('place_detail', {
                    screen: 'show_place',
                    params: item.place,
                  })
                }
              />
            )}
          />
        </View>
      )}
    </AppLayout>
  )
}

export default FavoriteScreen
