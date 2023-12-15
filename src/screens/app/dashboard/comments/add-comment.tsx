import { TouchableOpacity, View } from 'react-native'
import { ICommentForm, useCommentForm } from './use-form'
import AppTheme from '../../../../styles'
import CommentInput from '../../../../components/comment-input'
import { Avatar } from '@rneui/base'
import Icon from '../../../../components/icon'

interface IAddCommentForm {
  onSubmit: (data: ICommentForm) => void
}

const AddCommentForm: React.FC<IAddCommentForm> = ({ onSubmit }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useCommentForm()

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        ...AppTheme.elevation,
      }}
    >
      <CommentInput
        avatar={
          <Avatar
            size={40}
            rounded
            source={{ uri: 'https://randomuser.me/api/portraits/men/36.jpg' }}
          />
        }
        control={control}
        name="comment"
        renderErrorMessage={false}
        rightIcon={
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <Icon name="send" />
          </TouchableOpacity>
        }
      />
    </View>
  )
}

export default AddCommentForm
