import Carousel from 'react-native-reanimated-carousel'
import PlaceItem from '../../../../../components/placeItem'
import { NavigationProp } from '@react-navigation/native'
interface IPlacesCarouselProps {
  data: any[]
  navigation: NavigationProp<any>
}
const PlacesCarousel: React.FC<IPlacesCarouselProps> = ({
  data,
  navigation,
}) => {
  return (
    <Carousel
      width={250}
      height={310}
      loop={false}
      style={{ width: '100%' }}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={({ item, index }) => (
        <PlaceItem
          key={index}
          data={item}
          onPress={() => navigation.navigate('place_detail')}
        />
      )}
    />
  )
}

export default PlacesCarousel
