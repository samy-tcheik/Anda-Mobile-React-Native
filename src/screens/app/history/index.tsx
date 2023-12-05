import { FlatList, RefreshControl, Text, View } from 'react-native'
import AppLayout from '../app-layout'
import Typography from '../../../components/text'
import ListItem from '../../../components/listItem'
import { useHistory } from './queries'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface IHistoryScreenProps {
  navigation: DrawerNavigationProp<any>
}

const HistoryScreen: React.FC<IHistoryScreenProps> = ({ navigation }) => {
  const { data, isLoading, isRefetching, refetch, hasNextPage, fetchNextPage } =
    useHistory({
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
    <AppLayout navigation={navigation}>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <Typography.BodyHeavy>isLoading</Typography.BodyHeavy>
        ) : (
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
                onPress={() => navigation.navigate('place_detail', item.place)}
              />
            )}
          />
        )}
      </View>
    </AppLayout>
  )
}

export default HistoryScreen
