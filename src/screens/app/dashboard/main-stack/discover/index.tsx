import { Card, Image, Text } from '@rneui/base'
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native'

import { NavigationProp } from '@react-navigation/native'
import AppLayout from '../../../app-layout'
import SearchBar from '../../../../../components/searchBar'
import Typography from '../../../../../components/text'
import Icon from '../../../../../components/icon'
import AppTheme from '../../../../../styles'
import { usePopup } from '../../../../../hooks/usePopup'
import Filters from './filters'
import { useFilters } from '../../../../../hooks/useFilters'
import { useEffect } from 'react'
import { IPlace } from '../../../types'
import { usePlaces } from '../../../queries'

interface IDiscoverScreenProps {
  navigation: NavigationProp<any>
}

const DiscoverScreen: React.FC<IDiscoverScreenProps> = ({ navigation }) => {
  const filtersModal = usePopup()
  const { filters, setFilters } = useFilters({
    filters: ['category_id', 'range', 'town_id'],
  })
  useEffect(() => {
    setFilters(filtersModal.data as any)
  }, [filtersModal.data])
  const {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isRefetching,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = usePlaces(undefined, filters, {
    getNextPageParam: (nextPage) => {
      if (nextPage.meta.current_page !== nextPage.meta.last_page) {
        return nextPage.meta.current_page + 1
      }
    },
  })
  const handleLoadMore = () => {
    console.log('handle load more')
    if (hasNextPage) {
      fetchNextPage()
    }
  }
  return (
    <AppLayout navigation={navigation}>
      <SearchBar />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}
      >
        <Typography.CaptionLight>
          Showin 12 of 200 results
        </Typography.CaptionLight>
        <TouchableOpacity
          onPress={(event) => {
            event.persist()
            filtersModal.open()
          }}
          style={{ flexDirection: 'row' }}
        >
          <Typography.CaptionLight>Filter & sort</Typography.CaptionLight>
          <Icon name="tune" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <Typography.BodyHeavy>isLoading</Typography.BodyHeavy>
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
            onEndReached={handleLoadMore}
            data={data?.pages.map((page) => page.data).flat()}
            renderItem={({ item }) => (
              <ListItem
                data={item}
                onPress={() => navigation.navigate('place_detail', item)}
              />
            )}
          />
        )}
      </View>
      <Filters {...filtersModal} />
    </AppLayout>
  )
}

export default DiscoverScreen

interface ItemProps {
  data: IPlace
  onPress: () => void
}

const ListItem: React.FC<ItemProps> = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        containerStyle={{
          ...AppTheme.elevation,
          height: 145,
          borderRadius: 13,
        }}
        wrapperStyle={{
          width: '100%',
          flexDirection: 'row',
        }}
      >
        <Image
          containerStyle={{
            aspectRatio: 1,
            width: 110,
            marginRight: 10,
            borderRadius: 13,
            ...AppTheme.elevation,
          }}
          source={{
            uri: `https://source.unsplash.com/random?sig=${1}`,
          }}
        />
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography.BodyHeavy>{data.name}</Typography.BodyHeavy>
            {/* <Text>{data.review}</Text> */}
          </View>
          <View
            style={{
              marginTop: 7,
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon size={17} name="map-marker" />
              <Typography.CaptionLight>
                {data.wilaya.name}
              </Typography.CaptionLight>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon size={17} name="map-marker-distance" />
              <Typography.CaptionLight>
                {data.distance} km
              </Typography.CaptionLight>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  )
}
