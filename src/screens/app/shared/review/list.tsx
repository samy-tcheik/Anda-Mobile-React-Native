import { NavigationProp, RouteProp } from '@react-navigation/native'
import AppLayout from '../../app-layout'
import { useDeleteReview, useReviews } from './queries'
import { ReviewableType } from '../../../../enums/reviewableType'
import Loader from '../../../../components/loader'
import { FlatList, RefreshControl, View } from 'react-native'
import ReviewItem from './review-item'
import { usePopup } from '../../../../hooks/usePopup'
import ReactNativeModal from 'react-native-modal'
import { Card, Icon, ListItem } from '@rneui/base'
import { useTranslation } from 'react-i18next'
import AppTheme from '../../../../styles'
import ReviewActionModal from './actions'

interface Props {
  route: RouteProp<any>
  navigation: NavigationProp<any>
}
const ReviewListScreen: React.FC<Props> = ({ navigation, route }) => {
  const actionModal = usePopup<string>()
  const { data, hasNextPage, fetchNextPage, isRefetching, isLoading, refetch } =
    useReviews(ReviewableType.PLACE, route.params?.id, {
      getNextPageParam: (nextPage) => {
        if (nextPage.meta.current_page !== nextPage.meta.last_page) {
          return nextPage.meta.current_page + 1
        }
      },
    })

  const deleteReview = useDeleteReview({})

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const handleDeleteReview = (id: string) => {
    deleteReview.mutate(id, {
      onSuccess() {
        actionModal.onClose()
      },
    })
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
              paddingHorizontal: 15,
            }}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
            onEndReached={handleLoadMore}
            data={data?.pages.map((page) => page.data).flat()}
            renderItem={({ item }) => (
              <ReviewItem openActionModal={actionModal.open} data={item} />
            )}
          />
        </View>
      )}
      <ReviewActionModal
        {...actionModal}
        handleDeleteReview={handleDeleteReview}
        isDeleteLoading={deleteReview.isLoading}
      />
    </AppLayout>
  )
}

export default ReviewListScreen
