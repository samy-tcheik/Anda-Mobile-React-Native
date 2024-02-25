import { NavigationProp, RouteProp } from '@react-navigation/native'
import Background from '../../../../components/background'
import Header from '../../../../components/header'
import AppTheme from '../../../../styles'
import { Image, StyleSheet, View } from 'react-native'
import Button from '../../../../components/button'
import { useTranslation } from 'react-i18next'
import Typography from '../../../../components/text'

interface Props {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const ReviewSuccess: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation()
  const handleButtonPress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'review-list', params: route.params }],
    })
  }
  return (
    <Background>
      <Header backButton={true} onLeftClick={() => navigation.goBack()} />
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={require('../../../../assets/icons/nature-success.jpg')}
          style={{ height: 350, width: 350 }}
        />
      </View>
      <View style={styles.messageContainer}>
        <Typography.HeadlineHeavy style={styles.message}>
          {t('message:review_success_title')}
        </Typography.HeadlineHeavy>
        <Typography.CaptionLight style={styles.message}>
          {t('message:review_success_message')}
        </Typography.CaptionLight>
      </View>
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={handleButtonPress}
      >
        {t('common:continue')}
      </Button>
    </Background>
  )
}

export default ReviewSuccess

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
    shadowColor: AppTheme.colors.blue_b300,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  messageContainer: {
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  message: {
    textAlign: 'center',
  },
})
