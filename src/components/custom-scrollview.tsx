import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native'
import AppTheme from '../styles'

const CustomeScrollView: React.FC<ScrollViewProps> = ({ children }) => {
  return <ScrollView style={styles.container}>{children}</ScrollView>
}

export default CustomeScrollView

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppTheme.colors.neutral_n0 },
})
