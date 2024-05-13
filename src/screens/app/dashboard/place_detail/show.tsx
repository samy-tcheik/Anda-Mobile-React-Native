import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import AppLayout from '../../app-layout'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'
import { Image } from '@rneui/base'
import Typography from '../../../../components/text'
import Icon from '../../../../components/icon'
import AppTheme from '../../../../styles'
import { useAddLike, usePlace } from '../../queries'
import { usePopup } from '../../../../hooks/usePopup'
import { LikeType } from '../../types'
import Button from '../../../../components/button'
import GetLocation from 'react-native-get-location'
import ImageView from 'react-native-image-viewing'
import Loader from '../../../../components/loader'
import { Rating } from 'react-native-ratings'
import ReadMoreWrapper from '../../../../components/description'
import { useTranslation } from 'react-i18next'
import ReviewItem from '../../shared/review/review-item'
import ReviewsViewer from '../../../../components/reviews-viewer'
import { showLocation } from 'react-native-map-link'
interface IPlaceDetailScreenProps {
  route: RouteProp<any>
  navigation: NavigationProp<any>
}

const PlaceDetailScreen: React.FC<IPlaceDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { t } = useTranslation()
  const { width } = useWindowDimensions()
  const imageView = usePopup()
  const { data, isLoading } = usePlace(route.params?.id)
  const addPlaceLike = useAddLike(LikeType.PLACE)

  const handleLikeClick = () => {
    addPlaceLike.mutate(data?.id!)
  }
  const handleReadAllReviews = () => {
    navigation.navigate('review', { screen: 'review-list', params: data })
  }
  const openMapOnLocation = () => {
    GetLocation.getCurrentPosition()
      .then(({ latitude, longitude }) => {
        showLocation({
          latitude: data?.latitude!,
          longitude: data?.longitude!,
          sourceLatitude: latitude,
          sourceLongitude: longitude,
        })
      })
      .catch((error) => console.log('error', error))
    // getDirections({})
  }
  return (
    <AppLayout
      rightContent={
        !isLoading && (
          <Icon
            size={30}
            name={data?.liked ? 'cards-heart' : 'cards-heart-outline'}
          />
        )
      }
      onRightContentClick={handleLikeClick}
      title={t('common:detail')}
      backButton
      navigation={navigation}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View>
            <Carousel
              width={width}
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
              height={400}
              loop={false}
              data={data?.media!}
              scrollAnimationDuration={1000}
              renderItem={({ item }) => (
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image
                    onPress={imageView.open}
                    containerStyle={{
                      height: 400,
                      aspectRatio: 0.95,
                      borderRadius: 13,
                    }}
                    PlaceholderContent={<Loader />}
                    placeholderStyle={{ height: 400 }}
                    source={{
                      uri: item,
                    }}
                  />
                </View>
              )}
            />
          </View>
          <View style={styles.mainContent}>
            <View style={styles.placeInfoContainer}>
              <View>
                <Typography.SubheaderHeavy
                  onPress={() => navigation.navigate('test-screen')}
                >
                  {data?.name}
                </Typography.SubheaderHeavy>

                <View>
                  <View style={styles.placeInfoItem}>
                    <Rating
                      readonly
                      imageSize={20}
                      startingValue={data?.rating}
                      style={{
                        marginRight: 15,
                      }}
                    />
                    <Typography.DescriptionLight>
                      {data?.review_count} {t('common:reviews')}
                    </Typography.DescriptionLight>
                  </View>
                  <View style={styles.placeInfoItem}>
                    <Icon name="map-marker-outline" size={20} />
                    <Typography.DescriptionLight
                      style={{ marginHorizontal: 5 }}
                    >
                      {data?.wilaya.name},
                    </Typography.DescriptionLight>
                    <Typography.DescriptionLight>
                      {data?.town.name}{' '}
                    </Typography.DescriptionLight>
                    <Typography.DescriptionLight>
                      ({data?.distance} {t('common:km')})
                    </Typography.DescriptionLight>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <ReadMoreWrapper>{data?.description}</ReadMoreWrapper>
            </View>
            <View style={{ marginVertical: 20 }}>
              <Button onPress={openMapOnLocation}>
                <Icon name="navigation" size={30} color={'white'} />
                {t('common:view_itinerary')}
              </Button>
            </View>
            <View>
              <Button
                type="outline"
                onPress={() =>
                  navigation.navigate('review', {
                    screen: 'create-review',
                    params: data,
                  })
                }
              >
                {data?.reviewed
                  ? t('common:edit_review')
                  : t('common:add_review')}
              </Button>
              {/* <Button
                containerStyle={{ width: '40%' }}
                onPress={openMapOnLocation}
              >
                {t('common:add_photo')}
              </Button> */}
            </View>
            <ReviewsViewer
              reviewCount={data?.review_count!}
              data={data?.total_reviews!}
              rating={data?.rating!}
            />
            {data?.review_count! > 0 && (
              <View style={styles.commentsSection}>
                {data?.reviews.map((review, index) => (
                  <ReviewItem key={index} data={review} />
                ))}
                <Button
                  type="outline"
                  containerStyle={styles.showAllReviewsButton}
                  onPress={handleReadAllReviews}
                >
                  {t('common:show_all_reviews', { entity: data?.review_count })}
                </Button>
              </View>
            )}
          </View>

          <ImageView
            imageIndex={0}
            images={data?.media.map((item) => ({ uri: item }))!}
            visible={imageView.isOpen}
            onRequestClose={imageView.onClose}
          />
        </ScrollView>
      )}
    </AppLayout>
  )
}

export default PlaceDetailScreen

const styles = StyleSheet.create({
  mainContent: {
    padding: 5,
    paddingHorizontal: 15,
  },
  placeInfoContainer: {
    marginVertical: 10,
  },
  facilitiesContainer: { marginVertical: 10 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: {
    color: AppTheme.colors.neutral_n300,
  },
  padsContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  pad: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: AppTheme.borderRadius.default,
    borderWidth: 1,
    borderColor: AppTheme.colors.neutral_n200,
    height: 100,
    width: 100,
  },

  addReview: { color: AppTheme.colors.blue_b400 },
  commentSection: {
    borderRadius: 13,
    padding: 5,
    backgroundColor: AppTheme.colors.neutral_n10,
  },

  placeInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  description: {
    lineHeight: 21,
  },

  commentsSection: {},
  showAllReviewsButton: {
    marginTop: 10,
  },
})
