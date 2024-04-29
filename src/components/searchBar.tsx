import { StyleSheet } from 'react-native'
import { SearchBar as BaseSearchBar, SearchBarProps } from '@rneui/base'
import Icon from './icon'
import AppTheme from '../styles'
import { useTranslation } from 'react-i18next'

const SearchBar: React.FC<SearchBarProps> = ({
  onChangeText,
  value,
  onClear,
  onSubmitEditing,
}) => {
  const { t } = useTranslation()
  return (
    <BaseSearchBar
      lightTheme
      containerStyle={styles.barContainer}
      inputContainerStyle={styles.inputContainer}
      round
      placeholder={t('common:search')}
      searchIcon={<Icon name="magnify" />}
      clearIcon={<Icon name="close" onPress={onClear} />}
      showCancel={false}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
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
    ...AppTheme.elevation_light,
  },
})
