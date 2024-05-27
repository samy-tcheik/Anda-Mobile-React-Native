import { StyleSheet, View } from 'react-native'
import Background from '../../../../components/background'
import { Image } from '@rneui/base'
import Header from '../../../../components/header'
import { NavigationProp } from '@react-navigation/native'
import Input from '../../../../components/input'
import { IForgetPasswordForm, useForgetPasswordForm } from './use-form'
import Icon from '../../../../components/icon'
import Button from '../../../../components/button'
import { useTranslation } from 'react-i18next'
import { useForgetPassword } from './query'
import Typography from '../../../../components/text'
import CustomeScrollView from '../../../../components/custom-scrollview'
import { usePopup } from '../../../../hooks/usePopup'
import ErrorModal from '../../../../components/error-modal'

interface Props {
  navigation: NavigationProp<any>
}
const ForgetPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForgetPasswordForm()
  const errorModal = usePopup<string>()

  const { mutate, isLoading } = useForgetPassword()

  const onSubmit = (data: IForgetPasswordForm) => {
    mutate(data, {
      onSuccess() {
        //Passing the email cause it will be used in reset password form
        navigation.navigate('email-sent', { email: data.email })
      },
      onError(res: any) {
        errorModal.open(res.response.data.message)
      },
    })
  }
  return (
    <CustomeScrollView>
      <Background>
        <Header backButton={true} onLeftClick={() => navigation.goBack()} />

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={require('../../../../assets/icons/forget-password.jpg')}
              style={{ height: 350, width: 350 }}
            />
          </View>
          <View style={styles.messageContainer}>
            <Typography.HeadlineHeavy style={styles.message}>
              {t('message:forget_password_title')}
            </Typography.HeadlineHeavy>
            <Typography.CaptionLight style={styles.message}>
              {t('message:forget_password_message')}
            </Typography.CaptionLight>
          </View>
          <Input
            control={control}
            name="email"
            placeholder={t('common:email')}
            error={!!errors.email}
            errorMessage={errors.email?.message}
            returnKeyType="next"
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            rightIcon={<Icon name="email-outline" />}
            containerStyle={{ marginBottom: 5 }}
          />
          <Button loading={isLoading} onPress={handleSubmit(onSubmit)}>
            {t('common:send')}
          </Button>
        </View>
        <ErrorModal {...errorModal} />
      </Background>
    </CustomeScrollView>
  )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  message: {
    textAlign: 'center',
    marginVertical: 5,
  },
})
