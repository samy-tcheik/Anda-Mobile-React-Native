import { Button, HeaderProps } from '@rneui/base'
import { StyleSheet, View } from 'react-native'
import { Header as BaseHeader } from '@rneui/base'
import Icon from './icon'
import Typography from './text'
import AppTheme from '../styles'

interface IHeaderProps extends HeaderProps {
  onLeftClick?: () => void
  onRightClick?: () => void
  backButton?: boolean
  notification?: boolean
  title?: string
  rightContent?: React.ReactNode
}

const Header: React.FC<IHeaderProps> = ({
  notification = false,
  title,
  onLeftClick,
  onRightClick,
  backButton,
  rightContent,
  ...props
}) => {
  return (
    <BaseHeader
      backgroundColor="white"
      containerStyle={styles.header}
      centerComponent={
        <Typography.HeadlineHeavy>{title}</Typography.HeadlineHeavy>
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
        notification ? (
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
        ) : undefined
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
    // width: 50,
    // height: 50,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,

    // elevation: 6,
  },
  header: {
    border: 0,
    // backgroundColor: 'red',
    paddingHorizontal: 5,
    borderColor: 'transparent',
    marginBottom: 10,
  },
})
