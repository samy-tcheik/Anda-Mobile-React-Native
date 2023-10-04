import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import AppLayout from '../../app-layout'
import { NavigationProp } from '@react-navigation/native'
import Carousel from 'react-native-reanimated-carousel'
import { Card, Image } from '@rneui/base'
import Typography from '../../../../components/text'
import { Divider } from '@rneui/themed'
import CategoryItem from '../../../../components/categoryItem'
import Icon from '../../../../components/icon'
import AppTheme from '../../../../styles'

interface IPlaceDetailScreenProps {
  navigation: NavigationProp<any>
}

const PlaceDetailScreen: React.FC<IPlaceDetailScreenProps> = ({
  navigation,
}) => {
  const { width } = useWindowDimensions()
  return (
    <AppLayout backButton navigation={navigation}>
      <Card containerStyle={{ padding: 10, borderRadius: 10 }}>
        <Carousel
          width={width - 45}
          height={370}
          loop={false}
          style={{ width: '100%' }}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                containerStyle={{
                  width: '90%',
                  height: 370,
                  aspectRatio: 0.9,
                  borderRadius: 13,
                }}
                source={{ uri: 'https://source.unsplash.com/random?sig=3' }}
              />
            </View>
          )}
        />
        <View style={styles.mainContent}>
          <View style={styles.placeInfoContainer}>
            <View>
              <Typography.HeadlineHeavy>Sghirat</Typography.HeadlineHeavy>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="map-marker-outline" size={17} />
                <Typography.CaptionLight>Boumerdes</Typography.CaptionLight>
              </View>
            </View>
            <View style={{ padding: 10, flexDirection: 'row' }}>
              <Icon name="star-half-full" />
              <Typography.BodyLight>4.7(9k reviews)</Typography.BodyLight>
            </View>
          </View>
          <Divider
            width={3}
            style={{ borderColor: AppTheme.colors.neutral_n50 }}
          />
          <View style={styles.facilitiesContainer}>
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
          </View>

          <View>
            <Typography.SubheaderHeavy>Description</Typography.SubheaderHeavy>
            <Typography.CaptionLight>
              Tempor mollit consequat nisi eu nostrud cillum ut. Est ut nostrud
              ea commodo culpa nisi veniam nostrud amet in. Quis sint et
              pariatur dolor. Ut cillum Lorem mollit sunt excepteur deserunt
              fugiat sint id. Dolore cillum ut irure excepteur ea ipsum minim
              aliquip adipisicing amet incididunt cillum. Est cupidatat cillum
              sit est et sit magna.
            </Typography.CaptionLight>
          </View>
        </View>
      </Card>
    </AppLayout>
  )
}

export default PlaceDetailScreen

const styles = StyleSheet.create({
  mainContent: {
    padding: 20,
  },
  placeInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  facilitiesContainer: { marginVertical: 10 },
})
