import { Card, Slider } from '@rneui/base'
import { StyleSheet, View } from 'react-native'
import Typography from '../../../../../../components/text'
import Icon from '../../../../../../components/icon'
import { IFiltersForm, useFiltersForm } from './useForm'
import { Controller } from 'react-hook-form'
import MultiSelect from 'react-native-multiple-select'
import Button from '../../../../../../components/button'
import { useCategories, useTowns, useWilayas } from '../../../../queries'
import AppTheme from '../../../../../../styles'
import { useContext, useEffect } from 'react'
import { t } from 'i18next'
import AppLayout from '../../../../app-layout'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { FiltersContext } from '..'
import Loader from '../../../../../../components/loader'

const formInitializedData = {
  category_id: [],
  wilaya_id: '',
  town_id: '',
  range: 0,
  active: false,
}

interface Props {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const FiltersScreen: React.FC<Props> = ({ navigation }) => {
  const { state, setFilters, resetFilters } = useContext(FiltersContext)
  const wilayas = useWilayas()
  const { control, watch, handleSubmit, resetField, reset } =
    useFiltersForm(formInitializedData)
  const categories = useCategories()
  const towns = useTowns(watch('wilaya_id')!, {
    enabled: !!watch('wilaya_id'),
  })
  const onSubmit = (data: IFiltersForm) => {
    setFilters(data)
    navigation.goBack()
  }
  useEffect(() => {
    reset(state.filters)
  }, [state])

  const handleResetFilters = () => {
    reset(formInitializedData)
    resetFilters()
  }
  return (
    <AppLayout title={t('common:filters')} backButton navigation={navigation}>
      {wilayas.isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <>
            <View>
              <View style={styles.container}>
                <View>
                  {!watch('range') && (
                    <Controller
                      name="wilaya_id"
                      control={control}
                      render={({ field }) => {
                        return (
                          <View style={{ width: '100%' }}>
                            <MultiSelect
                              single
                              items={wilayas.data!}
                              selectedItems={[field.value]}
                              uniqueKey="id"
                              selectText={t('common:select_a_wilaya')}
                              searchInputPlaceholderText={`${t(
                                'common:search_a_wilaya'
                              )}...`}
                              onSelectedItemsChange={(selected) => {
                                resetField('town_id')
                                field.onChange(selected[0])
                              }}
                              styleListContainer={{
                                maxHeight: 300,
                              }}
                            />
                          </View>
                        )
                      }}
                    />
                  )}

                  {towns.isFetched && !watch('range') ? (
                    <Controller
                      name="town_id"
                      control={control}
                      render={({ field }) => (
                        <View style={{ width: '100%' }}>
                          <MultiSelect
                            single
                            items={towns.data!}
                            selectedItems={[field.value]}
                            uniqueKey="id"
                            selectText={t('common:select_a_town')}
                            searchInputPlaceholderText={`${t(
                              'common:search_a_town'
                            )}...`}
                            onSelectedItemsChange={(selected) => {
                              field.onChange(selected[0])
                            }}
                            styleListContainer={{
                              maxHeight: 300,
                            }}
                          />
                        </View>
                      )}
                    />
                  ) : null}
                  {!watch('wilaya_id') && (
                    <View style={[styles.contentView]}>
                      <Typography.CaptionLight>
                        {t('common:search_radius')} ({t('common:km')})
                      </Typography.CaptionLight>
                      <Controller
                        name="range"
                        control={control}
                        render={({ field }) => {
                          return (
                            <Slider
                              value={field.value}
                              onValueChange={(range) => {
                                resetField('wilaya_id')
                                resetField('town_id')
                                field.onChange(range)
                              }}
                              maximumValue={300}
                              minimumValue={5}
                              step={5}
                              allowTouchTrack
                              trackStyle={{
                                height: 5,
                                backgroundColor: 'transparent',
                              }}
                              thumbStyle={{
                                height: 30,
                                width: 30,
                                backgroundColor: 'transparent',
                              }}
                              thumbProps={{
                                children: <Icon name="map-marker" />,
                              }}
                            />
                          )
                        }}
                      />
                      <Typography.BodyHeavy>
                        {watch('range')}
                      </Typography.BodyHeavy>
                    </View>
                  )}

                  <Controller
                    name="category_id"
                    control={control}
                    render={({ field }) => {
                      // react form hook set field value to string if value null
                      // this behavior caused a type checking problem with Multiselect
                      const value =
                        typeof field.value === 'string' ? [] : field.value
                      return (
                        <View style={{ width: '100%' }}>
                          <MultiSelect
                            single={false}
                            items={categories.data!}
                            selectedItems={value}
                            uniqueKey="id"
                            submitButtonText={t('common:submit')}
                            selectedText={t('common:selected')}
                            selectText={t('common:select_a_category')}
                            searchInputPlaceholderText={`${t(
                              'common:search_a_category'
                            )}...`}
                            onSelectedItemsChange={field.onChange}
                          />
                        </View>
                      )
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <Button
                containerStyle={{ marginBottom: 15 }}
                onPress={handleSubmit(onSubmit as any)}
              >
                {t('common:apply_filters')}
              </Button>
              <Button
                color={AppTheme.colors.error_default}
                onPress={handleResetFilters}
              >
                {t('common:reset')}
              </Button>
            </View>
          </>
        </View>
      )}
    </AppLayout>
  )
}

export default FiltersScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    margin: 0,
  },
  buttonsContainer: {
    marginTop: 30,
  },
  head: { flexDirection: 'row', justifyContent: 'space-between' },
  contentView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
})
