import Carousel from 'react-native-reanimated-carousel'
import CategoryItem from '../../../../../components/categoryItem'
import { TouchableOpacity } from 'react-native'
import { IHomeCategory } from '../home/type'

interface ICategoryCarouselProps {
  data: IHomeCategory[]
  onChange?: (id: string) => void
}

const CategoryCarousel: React.FC<ICategoryCarouselProps> = ({
  data,
  onChange,
}) => {
  return (
    <Carousel
      width={250}
      height={80}
      loop={false}
      style={{ width: '100%' }}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => onChange?.(item.key)}>
          <CategoryItem key={index} name={item.name} icon={item.key} />
        </TouchableOpacity>
      )}
    />
  )
}

export default CategoryCarousel
