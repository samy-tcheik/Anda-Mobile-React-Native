import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native'
import AppLayout from '../../app-layout'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'
import { Image } from '@rneui/base'
import Typography from '../../../../components/text'
import { Divider } from '@rneui/themed'
import Icon from '../../../../components/icon'
import AppTheme from '../../../../styles'
import { useAddLike, usePlace } from '../../queries'
import { usePopup } from '../../../../hooks/usePopup'
import ReviewSection from './review'
import { IPlace, LikeType } from '../../types'
import { ICommentType } from '../comments/queries'

interface IPlaceDetailScreenProps {
  route: RouteProp<any>
  navigation: NavigationProp<any>
}

const PlaceDetailScreen: React.FC<IPlaceDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { width } = useWindowDimensions()
  const reviewSection = usePopup<IPlace>()
  const { data, isLoading } = usePlace(route.params?.id)
  const addLike = useAddLike(LikeType.PLACE)
  const handleLikeClick = () => {
    addLike.mutate(data?.id!)
  }
  console.log('place data', data)
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
      backButton
      navigation={navigation}
    >
      <ScrollView style={{ flex: 1, padding: 20 }}>
        {isLoading ? (
          <Typography.BodyHeavy>isLoading</Typography.BodyHeavy>
        ) : (
          <>
            <View>
              <Carousel
                width={width - 40}
                height={400}
                loop={false}
                style={{ width: '100%' }}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => (
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Image
                      containerStyle={{
                        width: '95%',
                        height: 400,
                        aspectRatio: 0.9,
                        borderRadius: 13,
                      }}
                      source={{
                        uri: 'https://source.unsplash.com/random?sig=3',
                      }}
                    />
                  </View>
                )}
              />
            </View>
            <View style={styles.mainContent}>
              <View style={styles.placeInfoContainer}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography.TitleHeavy>{data?.name}</Typography.TitleHeavy>
                    <View style={{ flexDirection: 'row' }}>
                      <Typography.BodyLight>
                        {data?.distance} KM
                      </Typography.BodyLight>
                    </View>
                  </View>
                  <View style={styles.padsContainer}>
                    <View style={styles.pad}>
                      <Icon name="map-marker-outline" size={30} />
                      <Typography.BodyLight>
                        {data?.wilaya.name}
                      </Typography.BodyLight>
                    </View>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('comments', {
                          data: data,
                          type: ICommentType.PLACE,
                        })
                      }
                      style={styles.pad}
                    >
                      <Icon name="comment-outline" size={30} />
                      <Typography.BodyLight>
                        {data?.comment_count}
                      </Typography.BodyLight>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => reviewSection.open(data)}
                      style={styles.pad}
                    >
                      <Icon
                        color={AppTheme.colors.neutral_n300}
                        size={30}
                        name="star-outline"
                      />
                      {data?.rating ? (
                        <Typography.BodyLight style={styles.rating}>
                          {data?.rating} ({data.rating_count})
                        </Typography.BodyLight>
                      ) : (
                        <Typography.CaptionHeavy style={styles.addReview}>
                          (Add a review)
                        </Typography.CaptionHeavy>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Divider
                width={3}
                style={{ borderColor: AppTheme.colors.neutral_n50 }}
              />
              {/* <View style={styles.facilitiesContainer}>
                <Typography.SubheaderHeavy style={{ marginBottom: 15 }}>
                  Facilities
                </Typography.SubheaderHeavy>
                <Carousel
                  width={150}
                  height={60}
                  loop={false}
                  style={{ width: '100%' }}
                  data={[...new Array(6).keys()]}
                  scrollAnimationDuration={1000}
                  renderItem={({ item, index }) => (
                    <CategoryItem name="sdqsds" index={index} />
                  )}
                />
              </View> */}

              <View>
                <Typography.BodyHeavy>Description</Typography.BodyHeavy>
                <Typography.CaptionLight>
                  {data?.description}
                </Typography.CaptionLight>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <ReviewSection {...reviewSection} />
    </AppLayout>
  )
}

export default PlaceDetailScreen

const styles = StyleSheet.create({
  mainContent: {
    padding: 5,
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
})
