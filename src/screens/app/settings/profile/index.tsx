import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native'
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
import { useAuthUser, useUpdateAvatar, useUpdateUser } from './queries'
import { usePopup } from '../../../../hooks/usePopup'
import ConfirmDeleteDialog from './confirmDelete'
import Loader from '../../../../components/loader'

interface ISettingsScreenProps {
  navigation: NavigationProp<any>
}

const ProfileScreen: React.FC<ISettingsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const { data, isLoading } = useAuthUser({
    onSuccess(data) {
      reset(data)
    },
  })
  const confirmDeleteDialog = usePopup()
  const form = useUserForm(data)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form

  const { mutate } = useUpdateAvatar()
  const updateUserProfile = useUpdateUser()
  const onSubmit = (data: IUserForm) => {
    updateUserProfile.mutate(data)
  }
  const handleEditAvatar = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      ({ assets, errorCode }) => {
        if (!assets) {
          // handle cancel ImageLibrary selection
          return null
        }
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
          // Send the form data to your backend
          mutate(formData, {
            onSuccess() {
              showMessage({
                message: t('message:avatar_upload_success'),
                type: 'success',
              })
            },
            onError(err) {
              console.log('err', err)
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
    <AppLayout backButton={true} navigation={navigation}>
      <ScrollView>
        {isLoading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <Avatar
                size={150}
                rounded
                title={!data?.avatar ? data?.name.charAt(0) : undefined}
                containerStyle={
                  !data!.avatar
                    ? {
                        backgroundColor: AppTheme.colors.primary_light,
                        borderRadius: 150,
                      }
                    : undefined
                }
                source={data!.avatar ? { uri: data!.avatar } : undefined}
              >
                <Avatar.Accessory
                  size={40}
                  name="pencil"
                  type="material-community"
                  onPress={handleEditAvatar}
                />
              </Avatar>

              <Typography.BodyHeavy>{data?.name}</Typography.BodyHeavy>
              <Typography.CaptionLight>{`@${data?.name}`}</Typography.CaptionLight>
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
              <Button
                buttonStyle={{
                  backgroundColor: AppTheme.colors.primary,
                  padding: 15,
                }}
                loading={updateUserProfile.isLoading}
                onPress={handleSubmit(onSubmit)}
              >
                {t('common:save')}
              </Button>
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
        )}
      </ScrollView>
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
