import { View } from 'react-native'
import PlacesCarousel from '../../../components/places-carousel'
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
  return (
    <View>
      {/* <View style={{ paddingHorizontal: 15 }}> */}
      {/* <Typography.SubheaderHeavy>
          {t('home:explore_places')}
        </Typography.SubheaderHeavy> */}
      {/* <Tab
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
        </Tab> */}
      {/* </View> */}
      {Object.keys(data).map((key) => (
        <View key={key}>
          <View style={{ alignItems: 'flex-start' }}>
            <Typography.SubheaderHeavy style={{ marginHorizontal: 20 }}>
              {t(`home:${key}`)}
            </Typography.SubheaderHeavy>
          </View>
          <View style={{ height: 330 }}>
            <PlacesCarousel
              key={key}
              data={data[key as keyof typeof data]}
              navigation={navigation}
            />
          </View>
        </View>
      ))}
      {/* <View style={{ height: 330 }}>
         <TabView disableSwipe value={index} onChange={setIndex}>
          {Object.keys(data).map((attribute) => (
            <TabView.Item key={attribute} style={{ width: '100%' }}>
              <PlacesCarousel
                data={data[attribute as keyof typeof data]}
                navigation={navigation}
              />
            </TabView.Item>
          ))}
        </TabView> 
      </View> */}
    </View>
  )
}

export default ExploreSection
