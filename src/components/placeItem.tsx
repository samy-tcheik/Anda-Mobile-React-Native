import { Card, CardProps, Image, Text } from '@rneui/base'
import AppTheme from '../styles'
import Typography from './text'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from './icon'
import { IPlace } from '../screens/app/types'

interface IPlaceItemProps extends CardProps {
  data: IPlace
  onPress: () => void
}

const PlaceItem: React.FC<IPlaceItemProps> = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card containerStyle={styles.card}>
        <Image
          containerStyle={styles.image}
          source={{
            uri: `https://source.unsplash.com/random?sig=${data.id}`,
          }}
        />
        <View style={styles.contentContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography.BodyHeavy
              style={{ maxWidth: '80%' }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {data.name}
            </Typography.BodyHeavy>
            {data.rating ? (
              <View style={styles.ratingContainer}>
                <Icon
                  color={AppTheme.colors.neutral_n300}
                  size={17}
                  name="star-outline"
                />
                <Text style={styles.rating}>{data.rating}</Text>
              </View>
            ) : null}
          </View>
          <View
            style={{
              marginTop: 7,
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
              <Text style={styles.wilaya}>{data.wilaya.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                color={AppTheme.colors.neutral_n300}
                size={17}
                name="map-marker-distance"
              />
              <Text style={styles.distance}>{data.distance} km</Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  image: {
    aspectRatio: 1,
    width: '100%',
    borderRadius: 13,
    ...AppTheme.elevation,
  },
  card: {
    ...AppTheme.elevation,
    height: 280,
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

export default PlaceItem
