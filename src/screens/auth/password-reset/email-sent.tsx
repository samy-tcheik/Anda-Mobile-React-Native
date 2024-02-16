import { NavigationProp, RouteProp } from '@react-navigation/native'
import Background from '../../../components/background'
import Header from '../../../components/header'
import { Image, StyleSheet, View } from 'react-native'
import Typography from '../../../components/text'
import { useTranslation } from 'react-i18next'
import Button from '../../../components/button'
import AppTheme from '../../../styles'

interface Props {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const EmailSent: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation()
  const handleButtonPress = () =>
    navigation.navigate('code-check', { email: route.params?.email })

  const handleResend = () => {
    navigation.goBack()
  }

  return (
    <Background>
      <Header backButton={true} onLeftClick={() => navigation.goBack()} />
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={require('../../../assets/icons/email-sent.jpg')}
          style={{ height: 300, width: 300 }}
        />
      </View>
      <View style={styles.messageContainer}>
        <Typography.TitleHeavy style={{ textAlign: 'center' }}>
          {t('message:email_sent_title')}
        </Typography.TitleHeavy>
        <Typography.CaptionLight style={{ textAlign: 'center' }}>
          {t('message:email_sent_message')}
        </Typography.CaptionLight>
      </View>
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={handleButtonPress}
      >
        {t('common:continue')}
      </Button>
      <Typography.CaptionLight style={{ textAlign: 'center', marginTop: 20 }}>
        {t('message:email_not_received')}{' '}
        <Typography.CaptionHeavy
          onPress={handleResend}
          style={{ color: AppTheme.colors.blue_b200 }}
        >
          {t('common:resend')}
        </Typography.CaptionHeavy>{' '}
      </Typography.CaptionLight>
    </Background>
  )
}

export default EmailSent

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    padding: 15,
    backgroundColor: AppTheme.colors.blue_b200,
  },
  buttonContainer: {
    borderRadius: 50,
    marginHorizontal: 20,
  },

  messageContainer: {
    justifyContent: 'center',
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  message: {
    textAlign: 'center',
  },
})
