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
  ...props
}) => {
  return (
    <BaseButton
      buttonStyle={{
        ...styles.button,
        backgroundColor: color,
      }}
      containerStyle={{ ...styles.buttonContainer, shadowColor: color }}
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
  },
  buttonContainer: {
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
})
