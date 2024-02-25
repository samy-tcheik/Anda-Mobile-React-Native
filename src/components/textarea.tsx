import { Input as BaseInput, InputProps } from '@rneui/base'

import { Control, useController } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import AppTheme from '../styles'

interface IInputProps extends InputProps {
  name: string
  control: Control<any>
  description?: string
  errorText?: string
  error?: boolean
}
const TextArea: React.FC<IInputProps> = ({
  ref,
  secureTextEntry,
  name,
  description,
  errorText,
  control,
  inputContainerStyle,
  ...props
}) => {
  const { field } = useController({ control, defaultValue: '', name })

  return (
    <BaseInput
      {...field}
      containerStyle={styles.containerStyle}
      inputContainerStyle={{
        ...styles.inputContainerStyle,
        ...(inputContainerStyle as object),
      }}
      onChangeText={(value) => field.onChange(value)}
      {...props}
    />
  )
}

export default TextArea

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: 'white',
    borderColor: AppTheme.colors.neutral_n50,
    borderWidth: 1,
    borderRadius: AppTheme.borderRadius.default,
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
