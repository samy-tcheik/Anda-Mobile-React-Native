import { ScrollView, StyleSheet, View } from 'react-native'
import Background from '../../../components/background'
import { Image } from '@rneui/base'
import Header from '../../../components/header'
import { NavigationProp } from '@react-navigation/native'
import Input from '../../../components/input'
import { useRegisterForm } from './use-form'
import { useRegister } from './queries'
import Icon from '../../../components/icon'
import AppTheme from '../../../styles'
import { IRegisterForm } from './type'
import { showMessage } from 'react-native-flash-message'
import { useTranslation } from 'react-i18next'
import LanguageChooser from '../languageChooser'
import i18n from '../../../service/i18n'
import Button from '../../../components/button'

interface Props {
  navigation: NavigationProp<any>
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation()
  const form = useRegisterForm()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form
  const { mutate, isLoading } = useRegister()
  const onSubmit = (data: IRegisterForm) => {
    mutate(
      { ...data },
      {
        onError(error: any) {
          showMessage({
            message: error.response.data.message,
            type: 'danger',
            icon: () => <Icon name="alert-circle" color="white" />,
          })
        },
        onSuccess() {
          showMessage({
            message: t('message:confirm_email'),
            type: 'success',
            icon: () => <Icon name="alert-circle" color="white" />,
          })
        },
      }
    )
  }

  return (
    <ScrollView>
      <Background>
        <Header
          backButton={true}
          onLeftClick={() => navigation.goBack()}
          rightComponent={<LanguageChooser />}
        />
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/logo.png')}
              style={{ height: 250, width: 250 }}
            />
          </View>
          <Input
            control={control}
            name="name"
            placeholder={t('common:name')}
            errorMessage={errors.name?.message}
            error={!!errors.name}
            returnKeyType="next"
            autoCapitalize="none"
            rightIcon={<Icon name="account" />}
            containerStyle={{ marginBottom: 5 }}
            id="name"
          />
          <Input
            control={control}
            name="email"
            placeholder={t('common:email')}
            errorMessage={errors.email?.message}
            error={!!errors.email}
            returnKeyType="next"
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            rightIcon={<Icon name="email-outline" />}
            containerStyle={{ marginBottom: 5 }}
            id="email"
          />
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

          <Button loading={isLoading} onPress={handleSubmit(onSubmit)}>
            {t('common:register')}
          </Button>
        </View>
      </Background>
    </ScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
