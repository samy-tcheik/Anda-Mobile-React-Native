import { StyleSheet, View } from 'react-native'
import Background from '../../../components/background'
import { Button, Image } from '@rneui/base'
import Header from '../../../components/header'
import { NavigationProp } from '@react-navigation/native'
import Input from '../../../components/input'
import { useRegisterForm } from './use-form'
import { useRegister } from './queries'
import Icon from '../../../components/icon'
import AppTheme from '../../../styles'
import { IRegisterForm } from './type'
import { showMessage } from 'react-native-flash-message'

interface Props {
  navigation: NavigationProp<any>
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const form = useRegisterForm()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form
  const { mutate, isLoading } = useRegister()

  const onSubmit = (data: IRegisterForm) => {
    mutate(data, {
      onError(error: any) {
        showMessage({
          message: error.response.data.message,
          type: 'danger',
          icon: (props) => <Icon name="alert-circle" color="white" />,
        })
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
        <Input
          control={control}
          name="name"
          placeholder="Name"
          errorMessage={errors.name?.message}
          error={!!errors.name}
          returnKeyType="next"
          autoCapitalize="none"
          rightIcon={<Icon name="account" />}
          containerStyle={{ marginBottom: 5 }}
        />
        <Input
          control={control}
          name="email"
          placeholder="Email"
          errorMessage={errors.email?.message}
          error={!!errors.email}
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
          placeholder="Mot de passe"
          error={!!errors.password}
          errorMessage={errors.password?.message}
          returnKeyType="done"
          secureTextEntry
        />
        <Input
          control={control}
          name="password_confirmation"
          placeholder="Password confirmation"
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
          Connexion
        </Button>
      </View>
    </Background>
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
    marginVertical: 50,
  },
  loginButton: {
    padding: 15,
    backgroundColor: AppTheme.colors.blue_b300,
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
