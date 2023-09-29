import { View } from 'react-native'
import { Tab, TabView } from '@rneui/base'
import PlacesCarousel from '../../../components/places-carousel'
import { useState } from 'react'
import Typography from '../../../../../../../components/text'
import { FakePlacesData } from '../../../../../../../utils/fakeData'
import { NavigationProp } from '@react-navigation/native'

interface IExploreSectionProps {
  navigation: NavigationProp<any>
}

const ExploreSection: React.FC<IExploreSectionProps> = ({ navigation }) => {
  const [index, setIndex] = useState(0)
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Typography.TitleHeavy>Explore Cities</Typography.TitleHeavy>
      <Tab
        value={index}
        dense
        onChange={(e) => setIndex(e)}
        buttonStyle={{ height: 55 }}
        titleStyle={{ color: 'black' }}
        scrollable
        indicatorStyle={{ backgroundColor: 'black' }}
      >
        <Tab.Item title="All" />
        <Tab.Item title="Popular" />
        <Tab.Item title="Recommended" />
        <Tab.Item title="Most Viewed" />
        <Tab.Item title="Rating" />
      </Tab>
      <View style={{ height: 300 }}>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ width: '100%' }}>
            <PlacesCarousel data={FakePlacesData} navigation={navigation} />
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
            <PlacesCarousel data={FakePlacesData} navigation={navigation} />
          </TabView.Item>
          <TabView.Item style={{ width: '100%' }}>
            <PlacesCarousel data={FakePlacesData} navigation={navigation} />
          </TabView.Item>
        </TabView>
      </View>
    </View>
  )
}

export default ExploreSection
