import { NavigationProp, RouteProp } from '@react-navigation/native'
import AppLayout from '../../app-layout'
import { useReviews } from './queries'
import { ReviewableType } from '../../../../enums/reviewableType'
import Loader from '../../../../components/loader'
import { FlatList, RefreshControl, View } from 'react-native'
import ReviewItem from './review-item'

interface Props {
  route: RouteProp<any>
  navigation: NavigationProp<any>
}
const ReviewListScreen: React.FC<Props> = ({ navigation, route }) => {
  const { data, hasNextPage, fetchNextPage, isRefetching, isLoading, refetch } =
    useReviews(ReviewableType.PLACE, route.params?.id, {
      getNextPageParam: (nextPage) => {
        if (nextPage.meta.current_page !== nextPage.meta.last_page) {
          return nextPage.meta.current_page + 1
        }
      },
    })

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }
  return (
    <AppLayout backButton navigation={navigation}>
      {isLoading ? (
        <Loader />
      ) : (
        <View>
          <FlatList
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
            onEndReached={handleLoadMore}
            data={data?.pages.map((page) => page.data).flat()}
            renderItem={({ item }) => <ReviewItem data={item} />}
          />
        </View>
      )}
    </AppLayout>
  )
}

export default ReviewListScreen
