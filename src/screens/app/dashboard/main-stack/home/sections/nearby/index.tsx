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
import { useCategories, useWilayas } from './queries'

interface INearbySectionProps {
  navigation: NavigationProp<any>
}

const NearbySection: React.FC<INearbySectionProps> = ({ navigation }) => {
  const [index, setIndex] = useState(0)
  const categories = useCategories()
  const isLoading = categories.isLoading
  // const { data, isLoading } = useWilayas()
  // console.log(data)
  return (
    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
      {isLoading ? (
        <Typography.BodyHeavy>Loading</Typography.BodyHeavy>
      ) : (
        <>
          <Typography.TitleHeavy>Nearby</Typography.TitleHeavy>

          <Tab
            value={index}
            dense
            disableIndicator
            onChange={(e) => setIndex(e)}
            scrollable
          >
            {categories.data?.map((element, index) => (
              <Tab.Item
                key={index}
                title={
                  <CategoryItem
                    index={index}
                    name={element.name}
                    icon={element.key}
                  />
                }
              />
            ))}
          </Tab>
          <View style={{ height: 300 }}>
            <TabView value={index} onChange={setIndex} animationType="spring">
              {FakeCategoriesData.map(({ id }) => (
                <TabView.Item key={id} style={{ width: '100%' }}>
                  <PlacesCarousel
                    data={FakePlacesData}
                    navigation={navigation}
                  />
                </TabView.Item>
              ))}
            </TabView>
          </View>
        </>
      )}
    </View>
  )
}

export default NearbySection
