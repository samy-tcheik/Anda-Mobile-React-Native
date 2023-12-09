import { NavigationProp, RouteProp } from '@react-navigation/native'
import AppLayout from '../../app-layout'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { Avatar, Button } from '@rneui/base'
import Input from '../../../../components/input'
import { ICommentForm, useCommentForm } from './use-form'
import { Controller } from 'react-hook-form'
import Icon from '../../../../components/icon'
import { useComments } from './queries'
import CommentItem from '../../../../components/commentItem'

interface Props {
  route: RouteProp<any>
  navigation: NavigationProp<any>
}

const Comments: React.FC<Props> = ({ navigation, route }) => {
  const { data, isLoading, isRefetching, refetch, hasNextPage, fetchNextPage } =
    useComments(route.params?.data.id, {
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
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        data={data?.pages.map((page) => page.data).flat()}
        renderItem={({ item }) => <CommentItem data={item} />}
      />
      <View></View>
    </AppLayout>
  )
}

export default Comments

const AddCommentForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useCommentForm()

  const onSubmit = (data: ICommentForm) => {
    console.log(data)
  }

  return (
    <View>
      <Avatar />
      <Input
        control={control}
        name="comment"
        placeholder={'Commentaire'}
        error={!!errors.comment}
        errorMessage={errors.comment?.message}
        returnKeyType="next"
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        containerStyle={{ marginBottom: 5 }}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        color="error"
        containerStyle={{ ...styles.button, marginLeft: 15 }}
        type="clear"
      >
        {<Icon name="arrow-left" />}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
})
