import { TouchableOpacity, View } from 'react-native'
import PlacesCarousel from '../../../components/places-carousel'
import Typography from '../../../../../../../components/text'
import { NavigationProp } from '@react-navigation/native'
import CategoryCarousel from '../../../components/categories-carousel'
import AppTheme from '../../../../../../../styles'
import { IHomeCategory } from '../../type'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

interface INearbySectionProps {
  navigation: NavigationProp<any>
  data: IHomeCategory[]
}

const NearbySection: React.FC<INearbySectionProps> = ({ navigation, data }) => {
  const { t } = useTranslation()
  const [category, setCategory] = useState<string>('art_and_culture')
  return (
    <View style={{ paddingHorizontal: 15, marginTop: 20, paddingBottom: 100 }}>
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
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

        <CategoryCarousel onChange={(key) => setCategory(key)} data={data!} />

        <View style={{ height: 300 }}>
          <PlacesCarousel
            data={data.find((item) => item.key === category)?.places!}
            navigation={navigation}
          />
        </View>
      </>
    </View>
  )
}

export default NearbySection
