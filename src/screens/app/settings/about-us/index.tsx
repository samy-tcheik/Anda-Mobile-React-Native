import RenderHTML from 'react-native-render-html'
import CustomeScrollView from '../../../../components/custom-scrollview'
import Loader from '../../../../components/loader'
import AppLayout from '../../app-layout'
import { Dimensions } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import { useContactUs } from './query'

interface Props {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const ContactUsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { data, isLoading } = useContactUs()
  return (
    <AppLayout backButton navigation={navigation}>
      <CustomeScrollView>
        {isLoading ? (
          <Loader />
        ) : (
          <RenderHTML
            contentWidth={Dimensions.get('window').width}
            source={{ html: data?.content! }}
          />
        )}
      </CustomeScrollView>
    </AppLayout>
  )
}

export default ContactUsScreen
