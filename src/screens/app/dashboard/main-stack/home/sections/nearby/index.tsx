import { Tab, TabView } from '@rneui/base'
import { View } from 'react-native'
import PlacesCarousel from '../../../components/places-carousel'
import { useState } from 'react'
import Typography from '../../../../../../../components/text'
import {
  FakeCategoriesData,
  FakePlacesData,
} from '../../../../../../../utils/fakeData'
import CategoryItem from '../../../../../../../components/categoryItem'
import { NavigationProp } from '@react-navigation/native'

interface INearbySectionProps {
  navigation: NavigationProp<any>
}

const NearbySection: React.FC<INearbySectionProps> = ({ navigation }) => {
  const [index, setIndex] = useState(0)
  return (
    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
      <Typography.TitleHeavy>Nearby</Typography.TitleHeavy>

      <Tab
        value={index}
        dense
        disableIndicator
        onChange={(e) => setIndex(e)}
        scrollable
      >
        {FakeCategoriesData.map((element) => (
          <Tab.Item
            title={<CategoryItem index={element.id} name={element.name} />}
          />
        ))}
      </Tab>
      <View style={{ height: 300 }}>
        <TabView value={index} onChange={setIndex} animationType="spring">
          {FakeCategoriesData.map(() => (
            <TabView.Item style={{ width: '100%' }}>
              <PlacesCarousel data={FakePlacesData} navigation={navigation} />
            </TabView.Item>
          ))}
        </TabView>
      </View>
    </View>
  )
}

export default NearbySection
