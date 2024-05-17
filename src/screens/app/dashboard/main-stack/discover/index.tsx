import { NavigationProp, RouteProp } from '@react-navigation/native'
import { createContext, useEffect, useMemo, useReducer } from 'react'
import { IFiltersForm } from './filters/useForm'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DiscoverScreen from './list'
import FiltersScreen from './filters'

const filtersAction = {
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
  SET_SEARCH: 'SET_SEARCH',
}
interface IDiscoverScreenProps {
  navigation?: NavigationProp<any>
  route?: RouteProp<{ params: IFiltersForm }>
}

interface FiltersState {
  filters: object
  search: string
}

interface FiltersContextProps {
  setFilters: (filters: object) => void
  resetFilters: () => void
  setSearch: (term: string) => void
  state: FiltersState
}

export const FiltersContext = createContext<FiltersContextProps>(
  undefined as any
)

const initialState = {
  filters: {},
  search: '',
}

const DiscoverStack = createNativeStackNavigator()

const DiscoverStackScreen: React.FC<IDiscoverScreenProps> = ({ route }) => {
  const filtersReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case filtersAction.SET_FILTERS:
        return {
          ...prevState,
          filters: { ...prevState, ...action.filters },
        }
      case filtersAction.RESET_FILTERS:
        return {
          ...prevState,
          filters: initialState.filters,
        }
      case filtersAction.SET_SEARCH:
        return {
          ...prevState,
          search: action.term,
        }
    }
  }

  const [state, dispatch] = useReducer(filtersReducer, {
    ...initialState,
    filters: (route?.params as any)?.filters,
    search: (route?.params as any)?.search,
  })

  const filtersContext = useMemo(
    () => ({
      setFilters: (filters: object) =>
        dispatch({ type: filtersAction.SET_FILTERS, filters }),
      resetFilters: () => dispatch({ type: filtersAction.RESET_FILTERS }),
      setSearch: (term: string) =>
        dispatch({ type: filtersAction.SET_SEARCH, term }),
    }),
    []
  )

  useEffect(() => {
    filtersContext.setFilters((route?.params as any)?.filters)
    filtersContext.setSearch((route?.params as any)?.search)
  }, [route?.params])

  return (
    <FiltersContext.Provider value={{ ...filtersContext, state }}>
      <DiscoverStack.Navigator screenOptions={{ headerShown: false }}>
        <DiscoverStack.Screen name="discover_list" component={DiscoverScreen} />
        <DiscoverStack.Screen name="filters" component={FiltersScreen} />
      </DiscoverStack.Navigator>
    </FiltersContext.Provider>
  )
}

export default DiscoverStackScreen
