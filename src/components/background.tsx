import { StyleSheet, View } from 'react-native'

interface IBackgroundProps {
  children: React.ReactNode
}

const Background: React.FC<IBackgroundProps> = ({ children }) => {
  return <View style={styles.background}>{children}</View>
}

export default Background

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: 'white' },
})
