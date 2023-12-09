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
import { Card, Image } from '@rneui/base'
import Typography from '../../../../components/text'
import { Divider } from '@rneui/themed'
import Icon from '../../../../components/icon'
import AppTheme from '../../../../styles'
import { usePlace } from '../../queries'
import { usePopup } from '../../../../hooks/usePopup'
import ReviewSection from './review'
import { IPlace } from '../../types'
import { useAddLike } from './queries'

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
  const addLike = useAddLike()
  const handleLikeClick = () => {
    addLike.mutate(data?.id!)
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
      backButton
      navigation={navigation}
    >
      <ScrollView>
        <Card containerStyle={{ padding: 10, borderRadius: 10 }}>
          {isLoading ? (
            <Typography.BodyHeavy>isLoading</Typography.BodyHeavy>
          ) : (
            <>
              <View>
                <Carousel
                  width={width - 45}
                  height={370}
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
                          width: '90%',
                          height: 370,
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
                    <Typography.SubheaderHeavy>
                      {data?.name}
                    </Typography.SubheaderHeavy>
                    <View style={styles.row}>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon name="map-marker-outline" size={17} />
                        <Typography.BodyLight>
                          {data?.wilaya.name}
                        </Typography.BodyLight>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <Icon name="comment-outline" size={17} />
                        <Typography.BodyLight>12</Typography.BodyLight>
                      </View>

                      <TouchableOpacity
                        onPress={() => reviewSection.open(data)}
                        style={styles.ratingContainer}
                      >
                        <Icon
                          color={AppTheme.colors.neutral_n300}
                          size={17}
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
                    <View style={{ flexDirection: 'row' }}>
                      <Icon size={17} name="map-marker-distance" />

                      <Typography.CaptionLight>
                        {data?.distance}
                      </Typography.CaptionLight>
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
        </Card>
      </ScrollView>
      <ReviewSection {...reviewSection} />
    </AppLayout>
  )
}

export default PlaceDetailScreen

const styles = StyleSheet.create({
  mainContent: {
    padding: 20,
  },
  placeInfoContainer: {
    marginBottom: 10,
  },
  facilitiesContainer: { marginVertical: 10 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: {
    color: AppTheme.colors.neutral_n300,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addReview: { color: AppTheme.colors.blue_b400 },
  commentSection: {
    borderRadius: 13,
    padding: 5,
    backgroundColor: AppTheme.colors.neutral_n10,
  },
})
