import { StyleSheet, Text, View } from 'react-native'
import AppLayout from '../../app-layout'
import { NavigationProp } from '@react-navigation/native'
import { Avatar, Dialog } from '@rneui/base'
import Input from '../../../../components/input'
import { useUserForm } from './useForm'
import { useTranslation } from 'react-i18next'
import Icon from '../../../../components/icon'
import Typography from '../../../../components/text'
import AppTheme from '../../../../styles'
import Button from '../../../../components/button'
import * as ImagePicker from 'react-native-image-picker'
import { showMessage } from 'react-native-flash-message'
import { useAuthUser, useUpdateAvatar } from './queries'
import { usePopup } from '../../../../hooks/usePopup'
import ConfirmDeleteDialog from './confirmDelete'

interface ISettingsScreenProps {
  navigation: NavigationProp<any>
}

const ProfileScreen: React.FC<ISettingsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { data } = useAuthUser()
  const confirmDeleteDialog = usePopup()
  const form = useUserForm()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form

  const { mutate } = useUpdateAvatar()

  const handleEditAvatar = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo' },
      ({ assets, errorCode }) => {
        if (errorCode) {
          showMessage({
            message: t('message:image_picker_error'),
            type: 'danger',
          })
        } else {
          // Prepare form data
          const formData = new FormData()
          formData.append('avatar', {
            uri: assets![0].uri,
            type: assets![0].type,
            name: assets![0].fileName,
          })
          // You can also append other data here, e.g., user ID or authentication token

          // Send the form data to your backend
          mutate(formData, {
            onSuccess() {
              showMessage({
                message: t('message:avatar_upload_success'),
                type: 'success',
              })
            },
            onError(err) {
              showMessage({
                message: err.response.data.message,
                type: 'danger',
              })
            },
          })
        }
      }
    )
  }
  return (
    <AppLayout navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={150}
            rounded
            source={{
              uri: data && data?.avatar,
            }}
          >
            <Avatar.Accessory
              size={40}
              name="pencil"
              type="material-community"
              onPress={handleEditAvatar}
            ></Avatar.Accessory>
          </Avatar>

          <Typography.BodyHeavy>Samy Tcheikman</Typography.BodyHeavy>
          <Typography.CaptionLight>@samytcheikman</Typography.CaptionLight>
        </View>

        <Input
          control={control}
          name="name"
          placeholder={t('common:name')}
          error={!!errors.name}
          errorMessage={errors.name?.message}
          returnKeyType="next"
          autoCapitalize="none"
          rightIcon={<Icon name="account-outline" />}
          containerStyle={{ marginBottom: 5 }}
        />
        <View style={styles.buttonContainer}>
          <Button>{t('common:save')}</Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={confirmDeleteDialog.open}
            color={AppTheme.colors.error_default}
          >
            {t('common:delete_my_account')}
          </Button>
        </View>
        <ConfirmDeleteDialog {...confirmDeleteDialog} />
      </View>
    </AppLayout>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  avatarContainer: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingVertical: 10,
  },
})
