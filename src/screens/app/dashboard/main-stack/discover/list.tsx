import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native'

import { NavigationProp, RouteProp } from '@react-navigation/native'
import AppLayout from '../../../app-layout'
import SearchBar from '../../../../../components/searchBar'
import Typography from '../../../../../components/text'
import Icon from '../../../../../components/icon'
import { useContext } from 'react'
import { usePlaces } from '../../../queries'
import ListItem from '../../../../../components/listItem'
import { IFiltersForm } from './filters/useForm'
import AppTheme from '../../../../../styles'
import Loader from '../../../../../components/loader'
import { useDebounce } from '../../../../../hooks/useDebounce'
import { t } from 'i18next'
import EmptyList from '../../../../../components/empty-list'
import { FiltersContext } from '.'

interface IDiscoverScreenProps {
  navigation?: NavigationProp<any>
  route?: RouteProp<{ params: IFiltersForm }>
}

const DiscoverScreen: React.FC<IDiscoverScreenProps> = ({
  navigation,
  route,
}) => {
  const { state, setSearch } = useContext(FiltersContext)
  const { data, hasNextPage, fetchNextPage, isRefetching, isLoading, refetch } =
    usePlaces(undefined, state.filters, {
      getNextPageParam: (nextPage) => {
        if (nextPage.meta.current_page !== nextPage.meta.last_page) {
          return nextPage.meta.current_page + 1
        }
      },
    })
  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }
  const handleSearch = useDebounce<string>((term) => {}, 500)
  const handleSearchChange = (value: string) => {
    setSearch(value)
    handleSearch(value)
  }
  return (
    <AppLayout title={t('common:discover')} backButton navigation={navigation}>
      <SearchBar
        onClear={() => handleSearchChange('')}
        value={state.search}
        onChangeText={handleSearchChange}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: 20,
        }}
      >
        <TouchableOpacity
          onPress={(event) => {
            event.persist()
            navigation?.navigate('filters')
          }}
          style={{ flexDirection: 'row' }}
        >
          <Typography.CaptionLight>
            {t('common:filters')}
          </Typography.CaptionLight>
          {Object.keys(state.filters).length > 0 ? (
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
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
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
                onPress={() =>
                  navigation?.navigate('place_detail', {
                    screen: 'show_place',
                    params: item,
                  })
                }
              />
            )}
            ListEmptyComponent={
              <EmptyList message={t('message:no_search_result_message')} />
            }
          />
        </View>
      )}
    </AppLayout>
  )
}

export default DiscoverScreen
