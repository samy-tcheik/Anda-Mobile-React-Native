import { StyleSheet, Text, View } from 'react-native'
import AppLayout from '../app-layout'
import { NavigationProp } from '@react-navigation/native'
import { Avatar } from '@rneui/base'
import Input from '../../../components/input'
import { useUserForm } from './useForm'
import { useTranslation } from 'react-i18next'
import Icon from '../../../components/icon'

interface ISettingsScreenProps {
  navigation: NavigationProp<any>
}

const ProfileScreen: React.FC<ISettingsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const form = useUserForm()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form
  return (
    <AppLayout navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Avatar
            size={150}
            rounded
            source={{
              uri: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg',
            }}
          >
            <Avatar.Accessory
              size={40}
              name="pencil"
              type="material-community"
              onPress={() => console.log('Accessory worked!')}
            ></Avatar.Accessory>
          </Avatar>
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
})
