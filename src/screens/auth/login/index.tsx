import React from 'react'
import { showMessage } from 'react-native-flash-message'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Background from '../../../components/background'
import TextInput from '../../../components/text-input'
import { useLogin } from '../../../providers/auth/hooks'
import { ILoginForm } from './type'
import { useLoginForm } from './use-form'

const LoginScreen: React.FC = () => {
  const form = useLoginForm()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form
  const { mutate: login, isLoading } = useLogin()

  const onSubmit = (data: ILoginForm) => {
    login(data, {
      onError(error) {
        showMessage({
          message:
            error.response?.status === 403
              ? 'Votre compte est désactivé'
              : "L'utilisateur ou le mot de passe sont invalides.",
          type: 'danger',
          icon: (props: any) => (
            <Icon name="alert-circle" color="white" size={20} {...props} />
          ),
        } as any)
      },
    })
  }

  return (
    <Background>
      <Logo />
      <Header>Bienvenue</Header>
      <TextInput
        control={control}
        name="email"
        label="Email"
        errorText={errors.email?.message}
        error={!!errors.email}
        returnKeyType="next"
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        control={control}
        name="password"
        label="Mot de passe"
        error={!!errors.password}
        errorText={errors.password?.message}
        returnKeyType="done"
        secureTextEntry
      />

      <Button
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        mode="contained"
      >
        Connexion
      </Button>
    </Background>
  )
}

export default LoginScreen
