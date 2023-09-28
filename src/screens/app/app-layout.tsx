import { NavigationProp } from '@react-navigation/native'
import Background from '../../components/background'
import Header from '../../components/header'
import { DrawerNavigationProp } from '@react-navigation/drawer'

interface IAppLayoutProps {
  navigation: any
  children: React.ReactNode
}
const AppLayout: React.FC<IAppLayoutProps> = ({ navigation, children }) => {
  return (
    <Background>
      <Header onLeftClick={navigation.openDrawer} />
      {children}
    </Background>
  )
}

export default AppLayout
