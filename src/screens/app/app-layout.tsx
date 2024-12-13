import Background from '../../components/background'
import Header from '../../components/header'
import { ScrollView, View } from 'react-native'

interface IAppLayoutProps {
  navigation: any
  children: React.ReactNode
  backButton?: boolean
  rightContent?: React.ReactNode
  onRightContentClick?: () => void
  title?: string
  showWelcome?: boolean
}
const AppLayout: React.FC<IAppLayoutProps> = ({
  navigation,
  children,
  backButton,
  title,
  rightContent,
  onRightContentClick,
  showWelcome = false,
}) => {
  return (
    <Background>
      <Header
        showWelcome={showWelcome}
        rightContent={rightContent}
        backButton={backButton}
        onLeftClick={backButton ? navigation.goBack : navigation.openDrawer}
        onRightClick={onRightContentClick}
        title={title}
      />
      <View style={{ flex: 1 }}>{children}</View>
    </Background>
  )
}

export default AppLayout
