import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppTheme from '../../../../styles'
import { Avatar, Divider } from '@rneui/base'
import Typography from '../../../../components/text'
import Icon from '../../../../components/icon'
import { useAddLike } from '../../queries'
import { IReview, LikeType } from '../../types'
import { showMessage } from 'react-native-flash-message'
import moment from 'moment'
import { Rating } from 'react-native-ratings'

interface Props {
  data: IReview
  likable?: boolean
}

const ReviewItem: React.FC<Props> = ({ data, likable = false }) => {
  const addLike = useAddLike(LikeType.REVIEW)

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
      <Divider />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View style={styles.authorContainer}>
              <Avatar size={40} rounded source={{ uri: data.user.avatar }} />
              <View style={styles.author}>
                <Typography.BodyHeavy>{data.user.name}</Typography.BodyHeavy>
                <Typography.CaptionLight>
                  {moment(data.created_at).fromNow()}
                </Typography.CaptionLight>
              </View>
            </View>
            {/* <Icon name="dots-horizontal" /> */}
            <TouchableOpacity
              onPress={handleLikeClick}
              style={styles.likeContainer}
            >
              {data.liked ? (
                <Icon
                  size={20}
                  name="cards-heart"
                  color={AppTheme.colors.blue_b300}
                />
              ) : (
                <Icon size={20} name="cards-heart-outline" />
              )}
              <Typography.CaptionLight>
                {data.likes_count > '0' ? data.likes_count : null}
              </Typography.CaptionLight>
            </TouchableOpacity>
          </View>
          <Rating
            readonly
            imageSize={15}
            startingValue={data?.rating}
            style={{
              marginBottom: 5,
              width: 80,
            }}
          />
          <Text>{data.comment}</Text>
        </View>
      </View>
    </View>
  )
}

export default ReviewItem

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
  },
  authorContainer: { flexDirection: 'row', marginBottom: 10 },
  headerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  author: { marginLeft: 10 },
  content: { marginLeft: 10, flex: 1 },
  likeContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
})
