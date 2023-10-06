import { Input as BaseInput, InputProps } from '@rneui/base'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from './icon'
import { Control, useController } from 'react-hook-form'
import Typography from './text'
import AppTheme from '../styles'

interface IInputProps extends InputProps {
  name: string
  control: Control<any>
  description?: string
  errorText?: string
  error: boolean
}

const Input: React.FC<IInputProps> = ({
  ref,
  secureTextEntry,
  name,
  description,
  errorText,
  control,
  ...props
}) => {
  const [hiddenPassword, setHiddenPassword] = useState<boolean | undefined>(
    secureTextEntry
  )
  const EyeIcon: React.FC = () =>
    hiddenPassword ? (
      <Icon name="eye-off-outline" />
    ) : (
      <Icon name="eye-outline" />
    )
  const handleEyeClick = () => {
    setHiddenPassword(!hiddenPassword)
  }

  const { field } = useController({ control, defaultValue: '', name })
  return (
    <View>
      <BaseInput
        {...field}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        onChangeText={(value) => field.onChange(value)}
        rightIcon={
          secureTextEntry ? (
            <TouchableOpacity onPress={handleEyeClick}>
              <EyeIcon />
            </TouchableOpacity>
          ) : (
            props.rightIcon
          )
        }
        secureTextEntry={hiddenPassword}
        {...props}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  containerStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  // description: {
  //   fontSize: 13,
  //   color: AppTheme.colors.secondary,
  //   paddingTop: 8,
  // },
  error: {
    fontSize: 13,
    color: AppTheme.colors.error_default,
    paddingTop: 8,
  },
})
