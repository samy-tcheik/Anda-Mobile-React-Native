import { FlatList, View } from 'react-native'
import AppLayout from '../../../app-layout'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useLikes } from './queries'
import { RefreshControl } from 'react-native'
import ListItem from '../../../../../components/listItem'
import Loader from '../../../../../components/loader'
import EmptyList from '../../../../../components/empty-list'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation()

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
              <EmptyList message={t('message:empty_liked_list_message')} />
            }
          />
        </View>
      )}
    </AppLayout>
  )
}

export default FavoriteScreen
