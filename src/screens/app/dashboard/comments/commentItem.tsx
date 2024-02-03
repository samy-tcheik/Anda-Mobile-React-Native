import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IComment } from './type'
import AppTheme from '../../../../styles'
import { Avatar } from '@rneui/base'
import Typography from '../../../../components/text'
import Icon from '../../../../components/icon'
import { useAddLike } from '../../queries'
import { LikeType } from '../../types'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'

interface Props {
  data: IComment
}

const CommentItem: React.FC<Props> = ({ data }) => {
  const addLike = useAddLike(LikeType.COMMENT)

  const handleLikeClick = () => {
    addLike.mutate(data.id, {
      onSuccess() {
        showMessage({
          message: 'Vous avez liké un commentaire',
          type: 'success',
        })
      },
    })
  }

  return (
    <View style={styles.commentContainer}>
      <View style={styles.container}>
        <Avatar
          size={40}
          rounded
          source={{ uri: data.user.avatar?.original_url }}
        />
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View style={styles.authorContainer}>
              <Typography.BodyHeavy style={styles.author}>
                {data.user.name}
              </Typography.BodyHeavy>
              <Typography.CaptionLight>
                {moment(data.created_at).fromNow()}
              </Typography.CaptionLight>
            </View>
            <Icon name="dots-horizontal" />
          </View>
          <Text>{data.comment}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleLikeClick} style={styles.likeContainer}>
        <Typography.CaptionLight>
          {data.likes_count > '0' ? data.likes_count : null}
        </Typography.CaptionLight>
        <Typography.CaptionLight>J'aime</Typography.CaptionLight>
        {data.liked ? (
          <Icon size={15} name="thumb-up" color={AppTheme.colors.blue_b300} />
        ) : (
          <Icon size={15} name="thumb-up-outline" />
        )}
      </TouchableOpacity>
    </View>
  )
}

export default CommentItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppTheme.colors.neutral_n50,
    flexDirection: 'row',
    padding: 10,
    borderRadius: AppTheme.borderRadius.default,
  },
  authorContainer: { flexDirection: 'row', alignItems: 'center' },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  author: { marginRight: 7 },
  content: { marginLeft: 10, flex: 1 },
  likeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 70,
  },
  commentContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
})
