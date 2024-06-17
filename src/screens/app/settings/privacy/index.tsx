import { useTranslation } from 'react-i18next'
import AppLayout from '../../app-layout'
import { Dimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { usePrivacy } from './query'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import Loader from '../../../../components/loader'
import CustomeScrollView from '../../../../components/custom-scrollview'

interface Props {
  navigation: NavigationProp<any>
  route: RouteProp<any>
}

const PrivacyScreen: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation()
  const { data, isLoading } = usePrivacy()
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

export default PrivacyScreen
