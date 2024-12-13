import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AppTheme from '../../../../styles'
import { Avatar, Divider } from '@rneui/base'
import Typography from '../../../../components/text'
import Icon from '../../../../components/icon'
import { useAddLike } from '../../queries'
import { IReview, LikeType } from '../../types'
import moment from 'moment'
import { Rating } from 'react-native-ratings'
import { useTranslation } from 'react-i18next'
import 'moment/min/locales'
interface Props {
  data: IReview
  openActionModal: (data?: string | undefined) => void
}

const ReviewItem: React.FC<Props> = ({ data, openActionModal }) => {
  const { i18n } = useTranslation()
  const addReviewLike = useAddLike(LikeType.REVIEW)
  const handleReviewLike = () => {
    addReviewLike.mutate(data.id)
  }
  moment.locale(i18n.language)
  return (
    <View style={styles.commentContainer}>
      <Divider />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View style={styles.authorContainer}>
              <Avatar
                size={40}
                rounded
                title={!data.user.avatar ? data.user.name.charAt(0) : undefined}
                containerStyle={
                  !data.user.avatar
                    ? {
                        backgroundColor: AppTheme.colors.primary_light,
                        borderRadius: 50,
                      }
                    : undefined
                }
                source={
                  data.user.avatar ? { uri: data.user.avatar } : undefined
                }
              />
              <View style={styles.author}>
                <Typography.BodyHeavy>{data.user.name}</Typography.BodyHeavy>
                <Typography.CaptionLight>
                  {moment(data.created_at).fromNow()}
                </Typography.CaptionLight>
              </View>
            </View>
            {data.owner && (
              <TouchableOpacity
                onPress={() => openActionModal(data.id)}
                style={styles.actionContainer}
              >
                <Icon name="dots-horizontal" />
              </TouchableOpacity>
            )}
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
          <View style={styles.contentContainer}>
            <View style={{ paddingRight: 10, width: '95%' }}>
              <Typography.CaptionLight>{data.comment}</Typography.CaptionLight>
            </View>
            <TouchableOpacity
              onPress={handleReviewLike}
              style={styles.likeContainer}
            >
              {data.liked ? (
                <Icon
                  size={20}
                  name="cards-heart"
                  color={AppTheme.colors.primary}
                />
              ) : (
                <Icon size={20} name="cards-heart-outline" />
              )}
              <Typography.CaptionLight>
                {data.likes_count > '0' ? data.likes_count : null}
              </Typography.CaptionLight>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    marginVertical: 10,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  actionContainer: {},
})
