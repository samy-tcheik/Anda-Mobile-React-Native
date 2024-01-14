import { StyleSheet, TouchableOpacity, View } from 'react-native'
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
  const [categoryIndex, setCategoryIndex] = useState(0)
  return (
    <View style={styles.container}>
      <>
        <View style={styles.head}>
          <Typography.TitleHeavy>{t('home:nearby')}</Typography.TitleHeavy>
          <TouchableOpacity style={styles.seeMoreContainer}>
            <Typography.BodyLight
              onPress={() =>
                navigation.navigate('discover', {
                  category_id: [data[categoryIndex].id],
                })
              }
              style={styles.seeMore}
            >
              {t('home:see_more')}
            </Typography.BodyLight>
          </TouchableOpacity>
        </View>
        <Tab
          disableIndicator={true}
          value={categoryIndex}
          onChange={(e) => setCategoryIndex(e)}
          buttonStyle={styles.categoryButton}
          scrollable
        >
          {data.map((item, index) => (
            <Tab.Item
              activeOpacity={1}
              containerStyle={styles.tabItemContainer}
              key={item.id}
              title={t(`home:${item.key}`)}
            >
              <CategoryItem
                active={index === categoryIndex}
                name={item.name}
                icon={item.key}
              />
            </Tab.Item>
          ))}
        </Tab>
        <View style={{ height: 300 }}>
          <TabView
            disableSwipe
            value={categoryIndex}
            onChange={setCategoryIndex}
            animationType="spring"
          >
            {data.map((item) => (
              <TabView.Item key={item.id} style={styles.tabViewItem}>
                <PlacesCarousel
                  data={data[categoryIndex]?.places!}
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

const styles = StyleSheet.create({
  container: { marginTop: 20, paddingBottom: 160 },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  seeMoreContainer: {
    padding: 10,
  },
  seeMore: { color: AppTheme.colors.neutral_n200, marginLeft: 20 },
  categoryButton: {
    height: 50,
    marginHorizontal: 20,
  },
  tabItemContainer: {
    padding: 0,
    height: 70,
    width: 200,
  },
  tabViewItem: { width: '100%' },
})
