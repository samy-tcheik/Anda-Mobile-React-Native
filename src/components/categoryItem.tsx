import { Card, Image } from '@rneui/base'
import { View } from 'react-native'
import Typography from './text'

interface ICategory {
  index: number
  name: string
}

const CategoryItem: React.FC<ICategory> = ({ index, name }) => {
  return (
    <Card
      containerStyle={{
        height: 60,
        borderRadius: 13,
        margin: 0,
        padding: 10,
        flexDirection: 'row',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          containerStyle={{
            aspectRatio: 1,
            width: 40,
            borderRadius: 6,
            marginRight: 10,
          }}
          source={{
            uri: `https://source.unsplash.com/random?sig=${index}`,
          }}
        />
        <Typography.CaptionLight>{name}</Typography.CaptionLight>
      </View>
    </Card>
  )
}
export default CategoryItem
