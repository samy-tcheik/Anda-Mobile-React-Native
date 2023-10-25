import Background from '../../components/background'
import Header from '../../components/header'
import { ScrollView } from 'react-native'

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
      <ScrollView>{children}</ScrollView>
    </Background>
  )
}

export default AppLayout
