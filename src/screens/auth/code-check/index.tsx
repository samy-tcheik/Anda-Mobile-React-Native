import { StyleSheet, View } from 'react-native'
import Background from '../../../components/background'
import Header from '../../../components/header'
import { Image } from '@rneui/base'
import { NavigationProp } from '@react-navigation/native'
import Button from '../../../components/button'
import { useTranslation } from 'react-i18next'
import { useCodeCheck } from './query'
import { ICodeCheckForm, useCodeCheckForm } from './use-form'
import AppTheme from '../../../styles'

interface Props {
  navigation: NavigationProp<any>
}

const CodeCheckScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useCodeCheck()
  const { handleSubmit } = useCodeCheckForm()
  const onSubmit = (data: ICodeCheckForm) => {
    mutate(data, {
      onSuccess() {
        navigation.navigate('reset-password', { code: data.code })
      },
    })
  }
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
        <Button
          containerStyle={styles.loginButtonContainer}
          buttonStyle={styles.loginButton}
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          {t('common:send')}
        </Button>
      </View>
    </Background>
  )
}

export default CodeCheckScreen

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
  loginButton: {
    padding: 15,
    backgroundColor: AppTheme.colors.blue_b200,
  },
  loginButtonContainer: {
    borderRadius: 50,

    shadowColor: AppTheme.colors.blue_b300,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
})
