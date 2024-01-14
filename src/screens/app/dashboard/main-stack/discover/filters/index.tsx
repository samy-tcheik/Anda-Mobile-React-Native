import { Card, Slider } from '@rneui/base'
import { Modal, StyleSheet, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import Typography from '../../../../../../components/text'
import Icon from '../../../../../../components/icon'
import { IFiltersForm, useFiltersForm } from './useForm'
import { Controller } from 'react-hook-form'
import MultiSelect from 'react-native-multiple-select'
import Button from '../../../../../../components/button'
import { useCategories, useTowns, useWilayas } from '../../../../queries'
import AppTheme from '../../../../../../styles'

interface Props {
  open: (data?: IFiltersForm) => void
  onClose: (data?: IFiltersForm) => void
  isOpen: boolean
  data?: IFiltersForm
}

const Filters: React.FC<Props> = ({ isOpen, onClose, data: defaultData }) => {
  const wilayas = useWilayas()
  const { control, watch, handleSubmit, resetField, reset } =
    useFiltersForm(defaultData)
  const categories = useCategories()
  const towns = useTowns(watch('wilaya_id')!, {
    enabled: !!watch('wilaya_id'),
  })
  const onSubmit = (data: IFiltersForm) => {
    onClose(data)
  }
  return (
    <Modal visible={isOpen}>
      <Card containerStyle={styles.card}>
        <View style={styles.head}>
          <Typography.BodyHeavy>Filters</Typography.BodyHeavy>
          <Icon
            size={35}
            name="close"
            onPress={() => {
              reset()
              onClose()
            }}
          />
        </View>
        <View style={styles.container}>
          {!watch('range') && (
            <Controller
              name="wilaya_id"
              control={control}
              render={({ field }) => (
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
                  />
                </View>
              )}
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
                render={({ field }) => (
                  <Slider
                    value={field.value}
                    onValueChange={() => {
                      resetField('wilaya_id')
                      resetField('town_id')
                      field.onChange
                    }}
                    maximumValue={300}
                    minimumValue={5}
                    step={5}
                    allowTouchTrack
                    trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                    thumbStyle={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'transparent',
                    }}
                    thumbProps={{
                      children: <Icon name="map-marker" />,
                    }}
                  />
                )}
              />
              <Typography.BodyHeavy>{watch('range')}</Typography.BodyHeavy>
            </View>
          )}

          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <View style={{ width: '100%' }}>
                <MultiSelect
                  items={categories.data!}
                  selectedItems={field.value}
                  uniqueKey="id"
                  selectText="Selectionner une categorie"
                  searchInputPlaceholderText="Rechercher une category..."
                  onSelectedItemsChange={field.onChange}
                />
              </View>
            )}
          />
          <View style={{ marginBottom: 15 }}>
            <Button onPress={handleSubmit(onSubmit as any)}>
              Appliquer les filtres
            </Button>
          </View>
          <Button color={AppTheme.colors.error_default} onPress={() => reset()}>
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
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 0,
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
