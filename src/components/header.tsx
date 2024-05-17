import { Avatar, Button, HeaderProps, Image } from '@rneui/base'
import { StyleSheet, View } from 'react-native'
import { Header as BaseHeader } from '@rneui/base'
import Icon from './icon'
import Typography from './text'
import AppTheme from '../styles'
import { useContext } from 'react'
import { AuthContext } from '../providers/auth'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

interface IHeaderProps extends HeaderProps {
  onLeftClick?: () => void
  onRightClick?: () => void
  backButton?: boolean
  notification?: boolean
  showWelcome: boolean
  title?: string
  rightContent?: React.ReactNode
}

const Header: React.FC<IHeaderProps> = ({
  notification = false,
  showWelcome = false,
  title,
  onLeftClick,
  onRightClick,
  backButton,
  rightContent,
  ...props
}) => {
  const authContext = useContext(AuthContext)
  const { t } = useTranslation()
  return (
    <BaseHeader
      backgroundColor="white"
      containerStyle={styles.header}
      centerComponent={
        title ? (
          <Typography.TitleHeavy>{title}</Typography.TitleHeavy>
        ) : showWelcome ? (
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Typography.BodyLight>{t('home:welcome')}</Typography.BodyLight>
              <Image
                style={{ width: 25, height: 25, marginLeft: 10 }}
                source={require('../assets/icons/waving-hand.png')}
              />
            </View>
            <Typography.SubheaderHeavy>
              {authContext?.state.user?.name}
            </Typography.SubheaderHeavy>
          </View>
        ) : undefined
      }
      leftComponent={
        <Button
          onPress={onLeftClick}
          color="error"
          containerStyle={{ ...styles.button }}
          type="clear"
        >
          {backButton ? (
            <Icon name="chevron-left" size={30} />
          ) : (
            <Icon name="menu" />
          )}
        </Button>
      }
      rightComponent={
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {notification ? (
            <Button
              onPress={onRightClick}
              color="error"
              containerStyle={{ ...styles.button, marginRight: 15 }}
              type="clear"
            >
              <Icon name="bell-outline" />
            </Button>
          ) : rightContent ? (
            <Button
              onPress={onRightClick}
              color="error"
              containerStyle={{ ...styles.button }}
              type="clear"
            >
              {rightContent}
            </Button>
          ) : undefined}
        </View>
      }
      {...props}
    />
  )
}
export default Header

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    border: 0,
    paddingHorizontal: 5,
    borderColor: 'transparent',
    marginBottom: 10,
  },
})
