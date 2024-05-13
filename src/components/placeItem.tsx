import { Card, CardProps, Image, Text } from '@rneui/base'
import AppTheme from '../styles'
import Typography from './text'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from './icon'
import { IPlace } from '../screens/app/types'
import { Rating } from 'react-native-ratings'
import { memo } from 'react'
import Loader from './loader'
import { useTranslation } from 'react-i18next'

interface IPlaceItemProps extends CardProps {
  data: IPlace
  onPress: () => void
}

const PlaceItem: React.FC<IPlaceItemProps> = ({ data, onPress }) => {
  const { t } = useTranslation()
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.card}>
        <Image
          containerStyle={styles.image}
          resizeMode="cover"
          placeholderStyle={{ flex: 1 }}
          PlaceholderContent={<Loader />}
          source={{
            uri: data.media,
          }}
        />
        <View style={styles.contentContainer}>
          <Typography.DescriptionHeavy ellipsizeMode="tail">
            {data.name}
          </Typography.DescriptionHeavy>

          <View style={styles.ratingContainer}>
            <Rating
              readonly
              imageSize={15}
              startingValue={data?.rating}
              style={{
                width: 70,
                marginVertical: 4,
                marginRight: 10,
              }}
            />
            {data.rating !== 0 && (
              <Text style={styles.rating}>{data.review_count}</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Icon
                color={AppTheme.colors.neutral_n400}
                size={17}
                name="map-marker-outline"
              />
              <Typography.SmallLight style={styles.wilaya}>
                {data.wilaya.name},
              </Typography.SmallLight>
              <Typography.SmallLight style={styles.wilaya}>
                {' '}
                {data.town.name}
              </Typography.SmallLight>
            </View>
            <Typography.SmallLight style={styles.distance}>
              {data.distance} {t('common:km')}
            </Typography.SmallLight>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  image: {
    aspectRatio: 1,
    width: '100%',
    borderRadius: 13,
    // ...AppTheme.elevation,
  },
  card: {
    // ...AppTheme.elevation_light,
    height: 310,
    padding: 20,
    width: 250,
    borderRadius: 13,
  },
  contentContainer: {
    marginTop: 10,
  },
  wilaya: {
    color: AppTheme.colors.neutral_n300,
  },
  rating: {
    color: AppTheme.colors.neutral_n300,
  },
  distance: {
    color: AppTheme.colors.neutral_n300,
  },
})

export default memo(PlaceItem)
