import { ActivityIndicator, View } from 'react-native'
import AppTheme from '../styles'

const Loader: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator color={AppTheme.colors.blue_b400} size={50} />
    </View>
  )
}

export default Loader
