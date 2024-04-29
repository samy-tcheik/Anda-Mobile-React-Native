import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { IPlace } from '../screens/app/types'
import { Card, Image } from '@rneui/base'
import AppTheme from '../styles'
import Typography from './text'
import Icon from './icon'
import { memo } from 'react'
import { Rating } from 'react-native-ratings'
import { useTranslation } from 'react-i18next'

interface ItemProps {
  data: IPlace
  onPress: () => void
}

const ListItem: React.FC<ItemProps> = ({ data, onPress }) => {
  const { t } = useTranslation()
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.card}>
        <Image
          containerStyle={{
            aspectRatio: 1,
            width: 110,
            marginRight: 10,
            borderRadius: 13,
          }}
          source={{
            uri: data.media,
          }}
        />
        <View style={{ flex: 1 }}>
          <Typography.BodyHeavy>{data.name}</Typography.BodyHeavy>
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
                {data.distance} {t('common:km')}
              </Typography.CaptionLight>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default memo(ListItem)

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 145,
    borderRadius: 13,
    padding: 20,
  },
})
