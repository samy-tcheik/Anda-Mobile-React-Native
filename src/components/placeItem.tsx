import { Card, Image, Text } from '@rneui/base'
import AppTheme from '../styles'
import Typography from './text'
import { View } from 'react-native'
import Icon from './icon'

interface IPlaceItemProps {
  data: IPlace
}

const PlaceItem: React.FC<IPlaceItemProps> = ({ data }) => {
  return (
    <Card
      containerStyle={{
        ...AppTheme.elevation,
        height: 280,
        borderRadius: 13,
      }}
    >
      <Image
        containerStyle={{
          aspectRatio: 1,
          width: '100%',
          borderRadius: 13,
          ...AppTheme.elevation,
        }}
        source={{
          uri: `https://source.unsplash.com/random?sig=${data.id}`,
        }}
      />
      <View
        style={{
          marginTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography.BodyHeavy>{data.name}</Typography.BodyHeavy>
          <Text>{data.review}</Text>
        </View>
        <View
          style={{
            marginTop: 7,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Icon size={17} name="map-marker" />
            <Text>{data.wilaya}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon size={17} name="map-marker-distance" />
            <Text>{data.distance} km</Text>
          </View>
        </View>
      </View>
    </Card>
  )
}

export default PlaceItem
