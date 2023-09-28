import { Dimensions, View, ViewBase } from 'react-native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import SearchBar from '../../../../components/searchBar'
import AppLayout from '../../app-layout'
import Carousel from 'react-native-reanimated-carousel'
import { Card } from '@rneui/themed'
import AppTheme from '../../../../styles'
import { Image, Text } from '@rneui/base'
import Icon from '../../../../components/icon'
import Typography from '../../../../components/text'

interface IHomeScreenProps extends DrawerScreenProps<any> {}

const { SubheaderHeavy } = Typography

const HomeScreen: React.FC<IHomeScreenProps> = ({ navigation }) => {
  const width = Dimensions.get('window').width
  return (
    <AppLayout navigation={navigation}>
      <SearchBar />
      <View>
        <Carousel
          width={250}
          height={310}
          loop={false}
          style={{ width: '100%' }}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
          renderItem={({ index }) => (
            <Card
              containerStyle={{
                ...AppTheme.elevation,
                height: 280,
                borderRadius: 13,
              }}
            >
              <Image
                containerStyle={{
                  aspectRatio: 1,
                  width: '100%',
                  backgroundColor: 'red',
                  borderRadius: 13,
                  ...AppTheme.elevation,
                }}
                source={{
                  uri: `https://source.unsplash.com/random?sig=${index}`,
                }}
              />
              <View
                style={{
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <SubheaderHeavy>2eme plage</SubheaderHeavy>
                  <Text>Review</Text>
                </View>
                <View
                  style={{
                    marginTop: 7,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Icon size={17} name="map-marker" />
                    <Text>Boumerdes</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon size={17} name="map-marker-distance" />
                    <Text>15 km</Text>
                  </View>
                </View>
              </View>
            </Card>

            // <View
            //   style={{
            //     // flex: 1,
            //     marginHorizontal: 20,
            //     width: 250,
            //     height: 250,
            //     justifyContent: 'center',
            //   }}
            // >
            //   <Text style={{ textAlign: 'center', fontSize: 30 }}>{index}</Text>
            // </View>
          )}
        />
      </View>
    </AppLayout>
  )
}

export default HomeScreen
