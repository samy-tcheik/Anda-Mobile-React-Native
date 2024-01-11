import { TouchableOpacity, View } from 'react-native'
import PlacesCarousel from '../../../components/places-carousel'
import Typography from '../../../../../../../components/text'
import { NavigationProp } from '@react-navigation/native'
import AppTheme from '../../../../../../../styles'
import { IHomeCategory } from '../../type'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Tab, TabView } from '@rneui/base'
import CategoryItem from '../../../../../../../components/categoryItem'

interface INearbySectionProps {
  navigation: NavigationProp<any>
  data: IHomeCategory[]
}

const NearbySection: React.FC<INearbySectionProps> = ({ navigation, data }) => {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  return (
    <View style={{ marginTop: 20, paddingBottom: 100 }}>
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <Typography.TitleHeavy>{t('home:nearby')}</Typography.TitleHeavy>
          <TouchableOpacity
            style={{
              padding: 10,
            }}
          >
            <Typography.BodyLight
              onPress={() => navigation.navigate('discover')}
              style={{ color: AppTheme.colors.neutral_n200, marginLeft: 20 }}
            >
              {t('home:see_more')}
            </Typography.BodyLight>
          </TouchableOpacity>
        </View>
        <Tab
          disableIndicator={true}
          value={index}
          onChange={(e) => setIndex(e)}
          buttonStyle={{
            height: 40,
            marginHorizontal: 20,
          }}
          scrollable
        >
          {data.map((item) => (
            <Tab.Item
              activeOpacity={1}
              containerStyle={{
                padding: 0,
                height: 70,
                width: 200,
              }}
              key={item.id}
              title={t(`home:${item.key}`)}
            >
              <CategoryItem name={item.name} icon={item.key} />
            </Tab.Item>
          ))}
        </Tab>
        <View style={{ height: 300 }}>
          <TabView
            disableSwipe
            value={index}
            onChange={setIndex}
            animationType="spring"
          >
            {data.map((item) => (
              <TabView.Item key={item.id} style={{ width: '100%' }}>
                <PlacesCarousel
                  data={data[index]?.places!}
                  navigation={navigation}
                />
              </TabView.Item>
            ))}
          </TabView>
        </View>
      </>
    </View>
  )
}

export default NearbySection
