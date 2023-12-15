import { NavigationProp, RouteProp } from '@react-navigation/native'
import AppLayout from '../../app-layout'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { ICommentForm } from './use-form'
import { useAddComment, useComments } from './queries'
import CommentItem from './commentItem'
import AddCommentForm from './add-comment'
import { showMessage } from 'react-native-flash-message'

interface Props {
  route: RouteProp<any>
  navigation: NavigationProp<any>
}

const CommentsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { data, isLoading, isRefetching, refetch, hasNextPage, fetchNextPage } =
    useComments(route.params?.data.id, route.params?.type, {
      getNextPageParam: (nextPage) => {
        if (nextPage.meta.current_page !== nextPage.meta.last_page) {
          return nextPage.meta.current_page + 1
        }
      },
    })

  const addComment = useAddComment(route.params?.data.id, route.params?.type)

  const handleLoadMore = () => {
    console.log('handle load more')
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const handleSubmit = (data: ICommentForm) => {
    addComment.mutate(data, {
      onSuccess() {
        showMessage({
          type: 'success',
          message: 'Votre commentaire a bien etait ajouté',
        })
      },
    })
  }

  return (
    <AppLayout backButton navigation={navigation}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        data={data?.pages.map((page) => page.data).flat()}
        renderItem={({ item }) => <CommentItem data={item} />}
      />
      <View>
        <AddCommentForm onSubmit={handleSubmit} />
      </View>
    </AppLayout>
  )
}

export default CommentsScreen

const styles = StyleSheet.create({})
