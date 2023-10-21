import { ScrollView, StyleSheet, View } from 'react-native'

interface IBackgroundProps {
  children: React.ReactNode
}

const Background: React.FC<IBackgroundProps> = ({ children }) => {
  return <ScrollView style={styles.background}>{children}</ScrollView>
}

export default Background

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#f5f5f5', paddingBottom: 85 },
})
