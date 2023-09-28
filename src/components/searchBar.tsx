import { StyleSheet } from 'react-native'
import { SearchBar as BaseSearchBar } from '@rneui/base'
import Icon from './icon'
const SearchBar: React.FC = () => {
  return (
    <BaseSearchBar
      lightTheme
      containerStyle={styles.barContainer}
      inputContainerStyle={styles.inputContainer}
      round
      placeholder="Discover a city"
      searchIcon={<Icon name="magnify" />}
      clearIcon={<Icon name="close" />}
      showCancel={false}
    />
  )
}

export default SearchBar

const styles = StyleSheet.create({
  barContainer: {
    marginHorizontal: 15,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  inputContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
})
