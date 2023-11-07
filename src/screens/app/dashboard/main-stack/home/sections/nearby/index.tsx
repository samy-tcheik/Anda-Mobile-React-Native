import { TouchableOpacity, View } from 'react-native'
import PlacesCarousel from '../../../components/places-carousel'
import Typography from '../../../../../../../components/text'
import { NavigationProp } from '@react-navigation/native'
import CategoryCarousel from '../../../components/categories-carousel'
import AppTheme from '../../../../../../../styles'
import { useFilters } from '../../../../../../../hooks/useFilters'
import { useCategories, usePlacesNearby } from '../../../../../queries'

interface INearbySectionProps {
  navigation: NavigationProp<any>
}

const NearbySection: React.FC<INearbySectionProps> = ({ navigation }) => {
  const { filters, setFilters } = useFilters({ filters: ['category_id'] })
  const places = usePlacesNearby(filters)
  const categories = useCategories()
  console.log(places)
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
          <Typography.TitleHeavy>Nearby</Typography.TitleHeavy>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              padding: 10,
            }}
          >
            <Typography.BodyLight
              onPress={() => navigation.navigate('discover')}
              style={{ color: AppTheme.colors.neutral_n200, marginLeft: 20 }}
            >
              Voir plus
            </Typography.BodyLight>
          </TouchableOpacity>
        </View>
        {categories.isLoading ? (
          <Typography.BodyHeavy>Categories is loading</Typography.BodyHeavy>
        ) : (
          <CategoryCarousel
            onChange={(id) =>
              setFilters({
                category_id: id,
              })
            }
            data={categories.data!}
          />
        )}

        <View style={{ height: 300 }}>
          {places.isFetching ? (
            <Typography.BodyHeavy>Places is loading</Typography.BodyHeavy>
          ) : (
            <PlacesCarousel data={places.data!} navigation={navigation} />
          )}
        </View>
      </>
    </View>
  )
}

export default NearbySection
