import { BottomSheet, Button, Image } from '@rneui/base'
import { Card } from '@rneui/themed'
import { StyleSheet, Text, View } from 'react-native'
import Icon from '../../components/icon'
import { usePopup } from '../../hooks/usePopup'
import Typography from '../../components/text'
import AppTheme from '../../styles'
import { useEffect, useState } from 'react'
import i18n from '../../service/i18n'
import { useTranslation } from 'react-i18next'

type ILanguageState = 'fr' | 'en' | 'ar'

const LanguageChooser: React.FC = () => {
  const { t } = useTranslation()
  let languages = [
    {
      name: 'french',
      code: 'fr',
      source: require('../../assets/icons/fr.png'),
    },
    {
      name: 'english',
      code: 'en',
      source: require('../../assets/icons/en.png'),
    },
    {
      name: 'arabic',
      code: 'ar',
      source: require('../../assets/icons/ar.png'),
    },
  ]
  const [languageState, setLanguageState] = useState<ILanguageState | null>(
    null
  )
  useEffect(() => {
    i18n.language && setLanguageState(i18n.language as ILanguageState)
  }, [])
  const bottomSheet = usePopup()
  const handlePress = (lang: ILanguageState) => {
    setLanguageState(lang)
    i18n.changeLanguage(lang)
  }
  return (
    <View>
      <Button
        onPress={bottomSheet.open}
        color="error"
        containerStyle={{ ...styles.button }}
        type="clear"
      >
        <Icon name="translate" />
      </Button>
      <BottomSheet
        onBackdropPress={bottomSheet.onClose}
        isVisible={bottomSheet.isOpen}
      >
        <View style={styles.buttonsContainer}>
          <Typography.HeadlineHeavy>
            {t('common:select_language')}
          </Typography.HeadlineHeavy>
          {languages.map((language, i) => {
            let selected = language.code === languageState
            return (
              <Button
                onPress={() => handlePress(language.code as ILanguageState)}
                buttonStyle={
                  selected
                    ? styles.languageButtonSelected
                    : styles.languageButton
                }
                containerStyle={styles.languageButtonContainer}
                key={language.code}
              >
                <Typography.BodyLight
                  style={
                    selected ? styles.buttonTextSelected : styles.buttonText
                  }
                >
                  {t(`language:${language.name}`)}
                </Typography.BodyLight>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={language.source}
                />
              </Button>
            )
          })}
        </View>
      </BottomSheet>
    </View>
  )
}

export default LanguageChooser

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginRight: 15,
    // ...AppTheme.elevation_light,
  },
  languageButtonContainer: {
    marginVertical: 10,
    width: '80%',
    borderRadius: 50,
    height: 50,
  },
  languageButtonSelected: {
    height: 50,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    backgroundColor: AppTheme.colors.primary,
  },
  languageButton: {
    height: 50,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
  },
  buttonTextSelected: {
    color: 'white',
  },

  buttonsContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
})
