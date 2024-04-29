import PlaceItem from '../../../../../components/placeItem'
import { NavigationProp } from '@react-navigation/native'
import { memo } from 'react'
import { FlatList } from 'react-native'
interface IPlacesCarouselProps {
  data: any[]
  navigation: NavigationProp<any>
}
const PlacesCarousel: React.FC<IPlacesCarouselProps> = ({
  data,
  navigation,
}) => {
  return (
    <FlatList
      data={data}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      maxToRenderPerBatch={2}
      horizontal
      getItemLayout={(data, index) => ({
        length: 250,
        offset: 250 * index,
        index,
      })}
      initialNumToRender={3}
      renderItem={({ item }) => (
        <PlaceItem
          data={item}
          onPress={() =>
            navigation?.navigate('place_detail', {
              screen: 'show_place',
              params: item,
            })
          }
        />
      )}
    />
  )
}

export default memo(PlacesCarousel)
