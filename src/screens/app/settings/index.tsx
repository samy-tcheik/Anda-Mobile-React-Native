import { StyleSheet, Text, View } from 'react-native'
import AppLayout from '../app-layout'
import { NavigationProp } from '@react-navigation/native'
import { Avatar } from '@rneui/base'

interface ISettingsScreenProps {
  navigation: NavigationProp<any>
}

const SettingsScreen: React.FC<ISettingsScreenProps> = ({ navigation }) => {
  return (
    <AppLayout navigation={navigation}>
      <View style={styles.container}>
        <Text>Setting screen</Text>
      </View>
    </AppLayout>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
})
