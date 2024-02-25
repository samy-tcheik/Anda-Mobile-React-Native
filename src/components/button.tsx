import {
  Button as BaseButton,
  ButtonProps as BaseButtonProps,
} from '@rneui/base'
import { StyleSheet } from 'react-native'
import AppTheme from '../styles'

interface ButtonProps extends BaseButtonProps {
  color?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = AppTheme.colors.blue_b200,
  containerStyle,
  ...props
}) => {
  return (
    <BaseButton
      color={AppTheme.colors.blue_b200}
      buttonStyle={{
        ...styles.button,
      }}
      containerStyle={{
        ...(containerStyle as object),
        ...styles.buttonContainer,
        borderColor: color,
      }}
      {...props}
    >
      {children}
    </BaseButton>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: AppTheme.borderRadius.round,
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: AppTheme.borderRadius.round,
  },
})
