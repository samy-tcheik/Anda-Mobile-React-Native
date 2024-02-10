import React from 'react'
import Background from '../../../components/background'
import { useGoogleLogin, useLogin } from '../../../providers/auth/hooks'
import { ILoginForm } from './type'
import { useLoginForm } from './use-form'
import Typography from '../../../components/text'
import Input from '../../../components/input'
import Icon from '../../../components/icon'
import { Avatar, Button, Image } from '@rneui/base'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import AppTheme from '../../../styles'
import { NavigationProp } from '@react-navigation/native'
import { showMessage } from 'react-native-flash-message'
import { useTranslation } from 'react-i18next'
import Header from '../../../components/header'
import LanguageChooser from '../languageChooser'
import { LoginManager } from 'react-native-fbsdk-next'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
interface Props {
  navigation: NavigationProp<any>
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation()
  const form = useLoginForm()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form
  const { mutate: login, isLoading } = useLogin()
  const googleLogin = useGoogleLogin()
  // const facebookLogin = useFacebookLogin()

  const onSubmit = (data: ILoginForm) => {
    login(data, {
      onError(error) {
        console.log('error', error)
        showMessage({
          message: error.response.data.message,
          type: 'danger',
          icon: (props: any) => (
            <Icon name="alert-circle" color="white" size={20} {...props} />
          ),
        } as any)
      },
    })
  }

  const onFacebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          console.log('login canceled')
        } else {
          console.log(result.grantedPermissions?.toString())
        }
      }
    )
    // facebookLogin.mutate(data, {
    //   onError(error) {
    //     console.log('error', error)
    //     showMessage({
    //       message: error.response.data.message,
    //       type: 'danger',
    //       icon: (props: any) => (
    //         <Icon name="alert-circle" color="white" size={20} {...props} />
    //       ),
    //     } as any)
    //   },
    // })
  }

  const onGoogleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      await GoogleSignin.signIn()
      const { accessToken } = await GoogleSignin.getTokens()
      googleLogin.mutate({ token: accessToken })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView>
      <Background>
        <Header leftComponent={<></>} rightComponent={<LanguageChooser />} />
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
          <Input
            control={control}
            name="password"
            placeholder={t('common:password')}
            error={!!errors.password}
            errorMessage={errors.password?.message}
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="default"
            secureTextEntry
          />
          <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <Typography.BodyLight
              onPress={() => navigation.navigate('forget-password')}
              style={{ color: AppTheme.colors.blue_b300 }}
            >
              {t('common:forgot_password')}
            </Typography.BodyLight>
          </View>
          <Button
            containerStyle={styles.loginButtonContainer}
            buttonStyle={styles.loginButton}
            loading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            {t('common:login')}
          </Button>
          <Button
            containerStyle={styles.socialLoginButtonContainer}
            buttonStyle={styles.socialLoginButton}
            titleStyle={{ color: AppTheme.colors.neutral_n300 }}
            loadingProps={{ color: AppTheme.colors.neutral_n300 }}
            icon={
              <Image
                style={{
                  height: 24,
                  width: 24,
                  marginRight: 20,
                }}
                source={require('../../../assets/icons/google_logo.png')}
              />
            }
            loading={googleLogin.isLoading}
            onPress={onGoogleSignin}
          >
            {t('common:continue_with_google')}
          </Button>
          <Button
            containerStyle={styles.socialLoginButtonContainer}
            buttonStyle={styles.socialLoginButton}
            titleStyle={{ color: AppTheme.colors.neutral_n300 }}
            icon={
              <Image
                style={{
                  height: 24,
                  width: 24,
                  marginRight: 20,
                }}
                source={require('../../../assets/icons/facebook_logo.png')}
              />
            }
            loading={false}
            loadingProps={{ color: AppTheme.colors.neutral_n300 }}
            onPress={onFacebookLogin}
          >
            {t('common:continue_with_facebook')}
          </Button>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Typography.CaptionLight>
              {t('common:dont_have_account')}
            </Typography.CaptionLight>
            <Typography.CaptionLight
              onPress={() => navigation.navigate('register')}
              style={{ color: AppTheme.colors.blue_b300 }}
            >
              {t('common:register')}
            </Typography.CaptionLight>
          </View>
        </View>
      </Background>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  loginButton: {
    padding: 15,
    backgroundColor: AppTheme.colors.blue_b200,
  },
  loginButtonContainer: {
    borderRadius: 50,
    marginVertical: 5,
    shadowColor: AppTheme.colors.blue_b300,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  socialLoginButton: {
    padding: 15,
    backgroundColor: AppTheme.colors.neutral_n0,
    paddingHorizontal: 20,
  },
  socialLoginButtonContainer: {
    borderRadius: 50,
    marginVertical: 5,

    shadowColor: AppTheme.colors.neutral_n500,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
})
