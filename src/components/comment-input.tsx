import { Avatar, Input, InputProps } from '@rneui/base'
import { Control, useController } from 'react-hook-form'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface ICommentInputProps extends InputProps {
  control: Control<any>
  name: string
  avatar: React.ReactNode
}

const CommentInput: React.FC<ICommentInputProps> = ({
  ref,
  control,
  avatar,
  name,
  ...props
}) => {
  const { field } = useController({ control, defaultValue: '', name })

  return (
    <>
      {avatar}
      <Input
        {...field}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        onChangeText={(value) => field.onChange(value)}
        renderErrorMessage={false}
        placeholder="Comment"
        {...props}
      />
    </>
  )
}

export default CommentInput

const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  containerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
})
