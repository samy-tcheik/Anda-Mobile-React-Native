import { View } from 'react-native'
import { Tab, TabView } from '@rneui/base'
import PlacesCarousel from '../../../components/places-carousel'
import { useState } from 'react'
import Typography from '../../../../../../../components/text'
import { NavigationProp } from '@react-navigation/native'
import { IExploreData } from '../../type'
import { useTranslation } from 'react-i18next'

interface IExploreSectionProps {
  navigation: NavigationProp<any>
  data: IExploreData
}

const ExploreSection: React.FC<IExploreSectionProps> = ({
  navigation,
  data,
}) => {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  return (
    <View style={{ paddingHorizontal: 15 }}>
      <Typography.TitleHeavy>{t('home:explore_places')}</Typography.TitleHeavy>
      <Tab
        value={index}
        dense
        onChange={(e) => setIndex(e)}
        buttonStyle={{ height: 55 }}
        titleStyle={{ color: 'black' }}
        scrollable
        indicatorStyle={{ backgroundColor: 'black' }}
      >
        {Object.keys(data).map((attribute) => (
          <Tab.Item key={attribute} title={t(`home:${attribute}`)} />
        ))}
      </Tab>
      <View style={{ height: 300 }}>
        <TabView
          disableSwipe
          value={index}
          onChange={setIndex}
          animationType="spring"
        >
          {Object.keys(data).map((attribute) => (
            <TabView.Item key={attribute} style={{ width: '100%' }}>
              <PlacesCarousel
                data={data[attribute as keyof typeof data]}
                navigation={navigation}
              />
            </TabView.Item>
          ))}
        </TabView>
      </View>
    </View>
  )
}

export default ExploreSection
