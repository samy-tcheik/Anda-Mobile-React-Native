import { Image, StyleSheet, View } from 'react-native'
import Typography from './text'
import { useTranslation } from 'react-i18next'

interface Props {
  message: string
}

const EmptyList: React.FC<Props> = ({ message }) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../assets/icons/no-results.png')}
        style={styles.image}
      />
      <Typography.BodyHeavy style={styles.text}>{message}</Typography.BodyHeavy>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  image: { height: 300, width: 300 },
  text: { textAlign: 'center' },
})

export default EmptyList
