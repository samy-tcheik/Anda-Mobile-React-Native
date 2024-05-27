import { ScrollView, StyleSheet, View } from 'react-native'
import Background from '../../../../components/background'
import Header from '../../../../components/header'
import { Image } from '@rneui/base'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import AppTheme from '../../../../styles'
import Input from '../../../../components/input'
import Button from '../../../../components/button'
import { useTranslation } from 'react-i18next'
import { useResetPassword } from './query'
import { IResetPasswordForm, useResetPasswordForm } from './use-form'
import ErrorModal from '../../../../components/error-modal'
import { usePopup } from '../../../../hooks/usePopup'

interface Props {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const ResetPasswordScreen: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation()
  const errorModal = usePopup<string>()
  const { mutate, isLoading } = useResetPassword()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useResetPasswordForm()
  const onSubmit = (data: IResetPasswordForm) => {
    mutate(
      { ...data, code: route.params?.code },
      {
        onSuccess() {
          navigation.navigate('reset-password-success')
        },
        onError(res: any) {
          errorModal.open(res.response.data.message)
        },
      }
    )
  }
  return (
    <ScrollView>
      <Background>
        <Header backButton={true} onLeftClick={() => navigation.goBack()} />

        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              source={require('../../../../assets/icons/forget-password.jpg')}
              style={{ height: 350, width: 350 }}
            />
          </View>
          <Input
            control={control}
            name="password"
            placeholder={t('common:password')}
            error={!!errors.password}
            errorMessage={errors.password?.message}
            returnKeyType="done"
            secureTextEntry
          />
          <Input
            control={control}
            name="password_confirmation"
            placeholder={t('common:password_confirmation')}
            error={!!errors.password_confirmation}
            errorMessage={errors.password_confirmation?.message}
            returnKeyType="done"
            secureTextEntry
          />
          <Button
            containerStyle={styles.loginButtonContainer}
            buttonStyle={styles.loginButton}
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            {t('common:save')}
          </Button>
        </View>
        <ErrorModal {...errorModal} />
      </Background>
    </ScrollView>
  )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    padding: 15,
    backgroundColor: AppTheme.colors.primary,
  },
  loginButtonContainer: {
    borderRadius: 50,
  },
})
