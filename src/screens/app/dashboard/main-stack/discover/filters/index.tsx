import { Card, Slider } from '@rneui/base'
import { Modal, StyleSheet, View } from 'react-native'
import Typography from '../../../../../../components/text'
import Icon from '../../../../../../components/icon'
import { IFiltersForm, useFiltersForm } from './useForm'
import { Controller, set } from 'react-hook-form'
import MultiSelect from 'react-native-multiple-select'
import Button from '../../../../../../components/button'
import { useCategories, useTowns, useWilayas } from '../../../../queries'
import AppTheme from '../../../../../../styles'
import { useEffect, useState } from 'react'
import { t } from 'i18next'

const formInitializedData = {
  category_id: [],
  wilaya_id: '',
  town_id: '',
  range: 0,
  active: false,
}

interface Props {
  open: (data?: IFiltersForm) => void
  onClose: (data?: IFiltersForm) => void
  isOpen: boolean
  data?: IFiltersForm
}

const Filters: React.FC<Props> = ({ isOpen, onClose, data: defaultData }) => {
  const [key, setKey] = useState(0)
  const wilayas = useWilayas()
  const {
    control,
    watch,
    handleSubmit,
    resetField,
    formState: { isDirty },
    reset,
  } = useFiltersForm(formInitializedData)
  const categories = useCategories()
  const towns = useTowns(watch('wilaya_id')!, {
    enabled: !!watch('wilaya_id'),
  })
  const onSubmit = (data: IFiltersForm) => {
    onClose({ ...data, active: isDirty })
  }
  useEffect(() => {
    if (defaultData) {
      reset(defaultData)
    }
  }, [defaultData])
  return (
    <Modal onRequestClose={() => setKey(key + 1)} visible={isOpen}>
      <Card key={key} containerStyle={styles.card}>
        <View>
          <View style={styles.head}>
            <Typography.BodyHeavy>{t('common:filters')}</Typography.BodyHeavy>
            <Icon
              size={35}
              name="close"
              onPress={() => {
                onClose({ ...formInitializedData })
              }}
            />
          </View>
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
                          selectText="Selectionner une wilaya"
                          searchInputPlaceholderText="Rechercher une wilaya..."
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
                        selectText="Selectionner une commune"
                        searchInputPlaceholderText="Rechercher une commune..."
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
                    Rayon de recherche (km)
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
                  <Typography.BodyHeavy>{watch('range')}</Typography.BodyHeavy>
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
                        selectText="Selectionner une categorie"
                        searchInputPlaceholderText="Rechercher une category..."
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
            Appliquer les filtres
          </Button>
          <Button
            color={AppTheme.colors.error_default}
            onPress={() => reset(formInitializedData)}
          >
            Renitialiser
          </Button>
        </View>
      </Card>
    </Modal>
  )
}

export default Filters

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 0,
  },
  buttonsContainer: {
    marginTop: 30,
  },
  container: {
    // alignItems: 'center',
    // width: '100%',
  },
  head: { flexDirection: 'row', justifyContent: 'space-between' },
  contentView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
})
