import Background from '../../components/background'
import Header from '../../components/header'
import { ScrollView, View } from 'react-native'

interface IAppLayoutProps {
  navigation: any
  children: React.ReactNode
  backButton?: boolean
  title?: string
}
const AppLayout: React.FC<IAppLayoutProps> = ({
  navigation,
  children,
  backButton,
  title,
}) => {
  return (
    <Background>
      <Header
        backButton={backButton}
        onLeftClick={backButton ? navigation.goBack : navigation.openDrawer}
        title={title}
      />
      <View style={{ flex: 1 }}>{children}</View>
    </Background>
  )
}

export default AppLayout
