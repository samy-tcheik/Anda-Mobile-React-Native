import { StyleSheet, View } from 'react-native'
import Background from '../../../components/background'
import Header from '../../../components/header'
import { Image } from '@rneui/base'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import AppTheme from '../../../styles'
import Input from '../../../components/input'
import Button from '../../../components/button'
import { useTranslation } from 'react-i18next'
import { useResetPassword } from './query'
import { IResetPasswordForm, useResetPasswordForm } from './use-form'

interface Props {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const ResetPasswordScreen: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useResetPassword()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useResetPasswordForm()
  const onSubmit = (data: IResetPasswordForm) => {
    mutate({ ...data, code: route.params?.code })
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
          {t('common:register')}
        </Button>
      </View>
    </Background>
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
