import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import Typography from '../../../components/text'
import { ImageBackground, View } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { useTranslation } from 'react-i18next'
import AppTheme from '../../../styles'
import i18n from '../../../service/i18n'

interface Props {
  navigation: NavigationProp<any>
}

const slides = {
  fr: [
    {
      key: 1,
      image: require('../../../assets/images/desert_fr.webp'),
    },
    {
      key: 2,
      image: require('../../../assets/images/coast_fr.webp'),
    },
    {
      key: 3,
      image: require('../../../assets/images/forest_fr.webp'),
    },
  ],
  en: [
    {
      key: 1,
      image: require('../../../assets/images/desert_en.webp'),
    },
    {
      key: 2,
      image: require('../../../assets/images/coast_en.webp'),
    },
    {
      key: 3,
      image: require('../../../assets/images/forest_en.webp'),
    },
  ],
  ar: [
    {
      key: 1,
      image: require('../../../assets/images/desert_ar.webp'),
    },
    {
      key: 2,
      image: require('../../../assets/images/coast_ar.webp'),
    },
    {
      key: 3,
      image: require('../../../assets/images/forest_ar.webp'),
    },
  ],
}

const IntroSlider: React.FC<Props> = ({ navigation }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true)
  const { t } = useTranslation()

  const checkFirstLaunch = async () => {
    const hasLaunchedBefore = await AsyncStorage.getItem('hasLaunched')
    setIsFirstLaunch(!hasLaunchedBefore)
  }
  useEffect(() => {
    checkFirstLaunch()
  }, [])

  const navigateToLogin = () => {
    navigation.navigate('Login')
  }

  const handleFinish = async () => {
    await AsyncStorage.setItem('hasLaunched', 'true')
    navigateToLogin()
  }

  useEffect(() => {
    if (!isFirstLaunch) {
      navigateToLogin()
    }
  }, [isFirstLaunch])

  const renderItem = ({ item }: any) => (
    <ImageBackground
      source={item.image}
      style={{ flex: 1, height: '100%', width: '100%' }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 100,
          paddingHorizontal: 10,
        }}
      >
        <Typography.DisplayHeavy style={{ color: 'white' }}>
          {t(item.title)}
        </Typography.DisplayHeavy>
        <Typography.BodyLight style={{ color: 'white' }}>
          {t(item.text)}
        </Typography.BodyLight>
      </View>
    </ImageBackground>
  )
  return (
    <AppIntroSlider
      renderItem={renderItem}
      showSkipButton
      data={(slides as any)[i18n.language]}
      nextLabel={t('common:next')}
      skipLabel={t('common:skip')}
      doneLabel={t('common:get_started')}
      dotStyle={{
        backgroundColor: AppTheme.colors.neutral_n200,
      }}
      onSkip={handleFinish}
      onDone={handleFinish}
    />
  )
}

export default IntroSlider
