import { TouchableOpacity, View } from 'react-native'
import { IPlace } from '../screens/app/types'
import { Card, Image } from '@rneui/base'
import AppTheme from '../styles'
import Typography from './text'
import Icon from './icon'

interface ItemProps {
  data: IPlace
  onPress: () => void
}

const ListItem: React.FC<ItemProps> = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        containerStyle={{
          ...AppTheme.elevation,
          height: 145,
          borderRadius: 13,
        }}
        wrapperStyle={{
          width: '100%',
          flexDirection: 'row',
        }}
      >
        <Image
          containerStyle={{
            aspectRatio: 1,
            width: 110,
            marginRight: 10,
            borderRadius: 13,
            ...AppTheme.elevation,
          }}
          source={{
            uri: `https://source.unsplash.com/random?sig=${1}`,
          }}
        />
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography.BodyHeavy>{data.name}</Typography.BodyHeavy>
            {/* <Text>{data.review}</Text> */}
          </View>
          <View
            style={{
              marginTop: 7,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon size={17} name="map-marker" />
              <Typography.CaptionLight>
                {data.wilaya.name}
              </Typography.CaptionLight>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon size={17} name="map-marker-distance" />
              <Typography.CaptionLight>
                {data.distance} km
              </Typography.CaptionLight>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}

export default ListItem
