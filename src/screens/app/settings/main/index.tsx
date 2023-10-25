import { StyleSheet, Text, View } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { Avatar, Divider, ListItem } from '@rneui/base'
import { useTransitionProgress } from 'react-native-screens'
import { useTranslation } from 'react-i18next'
import { LinearProgress } from '@rneui/themed'
import { useAuthUser } from '../profile/queries'
import AppLayout from '../../app-layout'
import Typography from '../../../../components/text'
import Icon from '../../../../components/icon'
import LanguageItem from '../components/languageItem'
import AppTheme from '../../../../styles'

interface ISettingsScreenProps {
  navigation: NavigationProp<any>
}

const SettingsScreen: React.FC<ISettingsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation()
  const user = useAuthUser()
  return (
    <AppLayout title={t('common:settings')} navigation={navigation}>
      {user.isLoading ? (
        <></>
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
              source={{ uri: 'https://randomuser.me/api/portraits/men/33.jpg' }}
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
            <ListItem containerStyle={styles.itemContainer}>
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
            </ListItem>
            <LanguageItem />
            <ListItem containerStyle={styles.itemContainer}>
              <Icon name="lock-outline" />
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>
                  {t('common:privecy')}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                type="material-community"
                name="chevron-right"
                size={30}
              />
            </ListItem>
            <ListItem containerStyle={styles.itemContainer}>
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
            </ListItem>
            <ListItem containerStyle={styles.itemContainer}>
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
