import { Button, HeaderProps } from '@rneui/base'
import { StyleSheet, View } from 'react-native'
import { Header as BaseHeader } from '@rneui/base'
import Icon from './icon'
import Typography from './text'

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
      backgroundColor="transparent"
      style={{ position: 'absolute' }}
      centerComponent={
        <Typography.HeadlineHeavy>{title}</Typography.HeadlineHeavy>
      }
      leftComponent={
        <Button
          onPress={onLeftClick}
          color="error"
          containerStyle={{ ...styles.button, marginLeft: 15 }}
          type="clear"
        >
          {backButton ? <Icon name="arrow-left" /> : <Icon name="menu" />}
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
            containerStyle={{ ...styles.button, marginRight: 15 }}
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
    borderRadius: 50,
    justifyContent: 'center',
    width: 50,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
})
