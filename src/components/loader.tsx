import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native'
import AppTheme from '../styles'

const Loader: React.FC<ActivityIndicatorProps> = ({ size = 50 }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator color={AppTheme.colors.primary} size={size} />
    </View>
  )
}

export default Loader
