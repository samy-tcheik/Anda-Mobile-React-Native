import { StyleSheet, View } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { Avatar, ListItem } from '@rneui/base'
import { useTranslation } from 'react-i18next'
import { useAuthUser } from '../profile/queries'
import AppLayout from '../../app-layout'
import Typography from '../../../../components/text'
import Icon from '../../../../components/icon'
import LanguageItem from '../components/languageItem'
import AppTheme from '../../../../styles'
import Loader from '../../../../components/loader'

interface ISettingsScreenProps {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const SettingsScreen: React.FC<ISettingsScreenProps> = ({
  navigation,
  route,
}) => {
  const { t } = useTranslation()
  const user = useAuthUser()
  return (
    <AppLayout
      backButton={route.params?.goback}
      title={t('common:settings')}
      navigation={navigation}
    >
      {user.isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Typography.SubheaderHeavy>
            {t('common:profile')}
          </Typography.SubheaderHeavy>
          <ListItem
            onPress={() => navigation.navigate('profile')}
            containerStyle={styles.profileItemContainer}
          >
            <Avatar
              rounded
              size={80}
              title={!user.data!.avatar ? user.data?.name.charAt(0) : undefined}
              containerStyle={
                !user.data!.avatar
                  ? {
                      backgroundColor: AppTheme.colors.primary_light,
                      borderRadius: 150,
                    }
                  : undefined
              }
              source={
                user.data!.avatar ? { uri: user.data!.avatar } : undefined
              }
            />
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: 'bold' }}>
                {user.data?.name}
              </ListItem.Title>
              <ListItem.Subtitle>{user.data?.email}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron
              type="material-community"
              name="chevron-right"
              size={30}
            />
          </ListItem>
          <View style={styles.settingsContainer}>
            <Typography.SubheaderHeavy style={{ marginVertical: 5 }}>
              {t('common:settings')}
            </Typography.SubheaderHeavy>
            {/* <ListItem containerStyle={styles.itemContainer}>
              <Icon name="bell-outline" />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>
                  {t('common:notifications')}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                type="material-community"
                name="chevron-right"
                size={30}
              />
            </ListItem> */}
            <LanguageItem />
            <ListItem
              onPress={() => navigation.navigate('privacy')}
              containerStyle={styles.itemContainer}
            >
              <Icon name="lock-outline" />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>
                  {t('common:privacy')}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                type="material-community"
                name="chevron-right"
                size={30}
              />
            </ListItem>
            {/* <ListItem containerStyle={styles.itemContainer}>
              <Icon name="help-circle-outline" />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>
                  {t('common:help_center')}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                type="material-community"
                name="chevron-right"
                size={30}
              />
            </ListItem> */}
            <ListItem
              onPress={() => navigation.navigate('contact-us')}
              containerStyle={styles.itemContainer}
            >
              <Icon name="information-outline" />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>
                  {t('common:about_us')}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                type="material-community"
                name="chevron-right"
                size={30}
              />
            </ListItem>
          </View>
        </View>
      )}
    </AppLayout>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  profileItemContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: AppTheme.borderRadius.default,
    ...AppTheme.elevation,
  },
  itemContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: AppTheme.borderRadius.default,
    ...AppTheme.elevation_light,
  },
  settingsContainer: {
    marginTop: 30,
  },
})
