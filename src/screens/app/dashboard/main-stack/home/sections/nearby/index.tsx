import { Tab, TabView } from '@rneui/base'
import { TouchableOpacity, View } from 'react-native'
import PlacesCarousel from '../../../components/places-carousel'
import { useState } from 'react'
import Typography from '../../../../../../../components/text'
import {
  FakeCategoriesData,
  FakePlacesData,
} from '../../../../../../../utils/fakeData'
import CategoryItem from '../../../../../../../components/categoryItem'
import { NavigationProp } from '@react-navigation/native'
import { useCategories, usePlaces, useWilayas } from './queries'

interface INearbySectionProps {
  navigation: NavigationProp<any>
}

interface IUseFilterProps {
  filters: string[]
}

export type IFilter = {
  [key: string]: string
}

const useFilters = ({ filters }: IUseFilterProps) => {
  const [state, setState] = useState(() => {
    const filtersObject: { [key: string]: string } = {}
    filters.forEach((filter, i) => {
      filtersObject[filter] = ''
    })
    return filtersObject
  })
  return {
    setFilters: setState,
    filters: state,
  }
}

const NearbySection: React.FC<INearbySectionProps> = ({ navigation }) => {
  const [index, setIndex] = useState(0)
  const { filters, setFilters } = useFilters({ filters: ['category_id'] })
  const places = usePlaces(filters)
  const categories = useCategories()
  return (
    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
      <>
        <Typography.TitleHeavy>Nearby</Typography.TitleHeavy>
        {categories.isLoading ? (
          <Typography.BodyHeavy>Categories is loading</Typography.BodyHeavy>
        ) : (
          <Tab
            value={index}
            dense
            disableIndicator
            onChange={(e) => {
              console.log(e)
              setIndex(e)
            }}
            scrollable
          >
            {categories.data?.map((element, index) => (
              <TouchableOpacity>
                <Tab.Item
                  onPress={() =>
                    setFilters({
                      category_id: element.id,
                    })
                  }
                  key={index}
                  title={
                    <CategoryItem
                      onPress={() => console.log(element.id)}
                      index={index}
                      name={element.name}
                      icon={element.key}
                    />
                  }
                />
              </TouchableOpacity>
            ))}
          </Tab>
        )}

        <View style={{ height: 300 }}>
          {places.isFetching ? (
            <Typography.BodyHeavy>Places is loading</Typography.BodyHeavy>
          ) : (
            <TabView value={index} onChange={setIndex} animationType="spring">
              {FakeCategoriesData.map(({ id }) => (
                <TabView.Item key={id} style={{ width: '100%' }}>
                  <PlacesCarousel data={places.data!} navigation={navigation} />
                </TabView.Item>
              ))}
            </TabView>
          )}
        </View>
      </>
    </View>
  )
}

export default NearbySection
