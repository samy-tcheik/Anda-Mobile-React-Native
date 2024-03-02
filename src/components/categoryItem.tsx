import { Card } from '@rneui/base'
import { Image, StyleSheet, View } from 'react-native'
import Typography from './text'
import AppTheme from '../styles'
import { memo } from 'react'

const icons = {
  art_and_culture: require(`../assets/icons/categories/art_and_culture.png`),
  coastal_sites: require(`../assets/icons/categories/coastal_sites.png`),
  recreation_and_relaxation: require(`../assets/icons/categories/recreation_and_relaxation.png`),
  sacred_and_religious_sites: require(`../assets/icons/categories/sacred_and_religious_sites.png`),
  historic_sites: require(`../assets/icons/categories/historic_sites.png`),
  natural_sites: require(`../assets/icons/categories/natural_sites.png`),
  entertainment: require(`../assets/icons/categories/entertainment.png`),
}

interface ICategoryProps {
  name: string
  icon: keyof typeof icons
  active: boolean
}

const CategoryItem: React.FC<ICategoryProps> = ({ name, icon, active }) => {
  return (
    <Card
      containerStyle={
        active ? { ...styles.card, ...styles.active } : styles.card
      }
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{
            aspectRatio: 1,
            width: 40,
            borderRadius: 6,
            marginRight: 10,
          }}
          source={icons[icon]}
        />
        <Typography.CaptionHeavy>{name}</Typography.CaptionHeavy>
      </View>
    </Card>
  )
}
export default memo(CategoryItem)
const styles = StyleSheet.create({
  card: {
    height: 60,
    minWidth: 170,
    borderRadius: AppTheme.borderRadius.default,
    padding: 10,
    margin: 15,
    flexDirection: 'row',
  },
  active: {
    marginTop: 10,
    backgroundColor: AppTheme.colors.blue_b50,
    borderWidth: 2,
    ...AppTheme.elevation_light,
  },
})
