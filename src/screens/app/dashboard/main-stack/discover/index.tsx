import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native'

import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native'
import AppLayout from '../../../app-layout'
import SearchBar from '../../../../../components/searchBar'
import Typography from '../../../../../components/text'
import Icon from '../../../../../components/icon'
import { usePopup } from '../../../../../hooks/usePopup'
import Filters from './filters'
import { useFilters } from '../../../../../hooks/useFilters'
import { useCallback, useEffect } from 'react'
import { usePlaces } from '../../../queries'
import ListItem from '../../../../../components/listItem'
import { IFiltersForm } from './filters/useForm'
import AppTheme from '../../../../../styles'

interface IDiscoverScreenProps {
  navigation?: NavigationProp<any>
  route?: RouteProp<{ params: IFiltersForm }>
}

const DiscoverScreen: React.FC<IDiscoverScreenProps> = ({
  navigation,
  route,
}) => {
  console.log('route params', route?.params)
  const filtersModal = usePopup<IFiltersForm>()
  const { filters, setFilters } = useFilters({
    filters: ['category_id', 'range', 'town_id', 'wilaya_id'],
  })
  useFocusEffect(
    useCallback(() => {
      filtersModal.reset({ ...route?.params, range: 30 })
      return () => {
        filtersModal.reset({})
      }
    }, [])
  )
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
    <AppLayout backButton navigation={navigation}>
      <SearchBar />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}
      >
        <Typography.CaptionLight>
          Showin {data?.pages[0].meta.to} of {data?.pages[0].meta.total} results
        </Typography.CaptionLight>
        <TouchableOpacity
          onPress={(event) => {
            event.persist()
            filtersModal.open(filters)
          }}
          style={{ flexDirection: 'row' }}
        >
          <Typography.CaptionLight>Filter & sort</Typography.CaptionLight>
          {filters ? (
            <Icon
              name="filter-check"
              color={AppTheme.colors.blue_b400}
              style={{ marginLeft: 10 }}
            />
          ) : (
            <Icon name="filter-outline" style={{ marginLeft: 10 }} />
          )}
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
                onPress={() => navigation?.navigate('place_detail', item)}
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
