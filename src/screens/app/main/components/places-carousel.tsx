import Carousel from 'react-native-reanimated-carousel'
import PlaceItem from '../../../../components/placeItem'
interface IPlacesCarouselProps {
  data: any[]
}
const PlacesCarousel: React.FC<IPlacesCarouselProps> = ({ data }) => {
  return (
    <Carousel
      width={250}
      height={310}
      loop={false}
      style={{ width: '100%' }}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => <PlaceItem data={item} />}
    />
  )
}

export default PlacesCarousel
