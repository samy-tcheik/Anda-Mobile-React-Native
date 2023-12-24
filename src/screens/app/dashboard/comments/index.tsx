import { NavigationProp, RouteProp } from '@react-navigation/native'
import AppLayout from '../../app-layout'
import {
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native'
import { ICommentForm, useCommentForm } from './use-form'
import { useAddComment, useComments } from './queries'
import CommentItem from './commentItem'
import { showMessage } from 'react-native-flash-message'
import { TouchableOpacity } from 'react-native'
import AppTheme from '../../../../styles'
import CommentInput from '../../../../components/comment-input'
import { Avatar } from '@rneui/base'
import Icon from '../../../../components/icon'

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
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useCommentForm()

  const handleLoadMore = () => {
    console.log('handle load more')
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const onSubmit = (data: ICommentForm) => {
    addComment.mutate(data, {
      onSuccess() {
        showMessage({
          type: 'success',
          message: 'Votre commentaire a bien etait ajouté',
        })

        //clear and hide keyboard if add comment success
        reset()
        Keyboard.dismiss()
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
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            backgroundColor: 'white',
            alignItems: 'center',
            ...AppTheme.elevation,
          }}
        >
          <CommentInput
            avatar={
              <Avatar
                size={40}
                rounded
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/36.jpg',
                }}
              />
            }
            control={control}
            name="comment"
            renderErrorMessage={false}
            rightIcon={
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <Icon name="send" />
              </TouchableOpacity>
            }
          />
        </View>
      </View>
    </AppLayout>
  )
}

export default CommentsScreen

const styles = StyleSheet.create({})
