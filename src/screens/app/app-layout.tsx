import Background from '../../components/background'
import Header from '../../components/header'
import { ScrollView } from 'react-native'

interface IAppLayoutProps {
  navigation: any
  children: React.ReactNode
  backButton?: boolean
}
const AppLayout: React.FC<IAppLayoutProps> = ({
  navigation,
  children,
  backButton,
}) => {
  return (
    <Background>
      <Header
        backButton={backButton}
        onLeftClick={backButton ? navigation.goBack : navigation.openDrawer}
      />
      <ScrollView>{children}</ScrollView>
    </Background>
  )
}

export default AppLayout
