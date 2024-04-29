import { FlatList, RefreshControl, Text, View } from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useHistory } from '../queries'
import AppLayout from '../../app-layout'
import ListItem from '../../../../components/listItem'
import Loader from '../../../../components/loader'
import EmptyList from '../../../../components/empty-list'
import { t } from 'i18next'

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
    <AppLayout title={t('common:history')} navigation={navigation}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 100,
              flex: 1,
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
            ListEmptyComponent={
              <EmptyList message={t('message:empty_history_list_message')} />
            }
          />
        </View>
      )}
    </AppLayout>
  )
}

export default HistoryScreen
