import { StyleSheet, View } from 'react-native'
import Background from '../../../components/background'
import { Image } from '@rneui/base'
import Header from '../../../components/header'
import { NavigationProp } from '@react-navigation/native'

interface Props {
  navigation: NavigationProp<any>
}

const ForgetPasswordScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Background>
      <Header backButton={true} onLeftClick={() => navigation.goBack()} />

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/logo.jpg')}
            style={{ height: 150, width: 150 }}
          />
        </View>
      </View>
    </Background>
  )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
})
