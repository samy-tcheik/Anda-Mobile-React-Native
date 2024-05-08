import { BottomSheet, Button, Image, ListItem } from '@rneui/base'
import { StyleSheet, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import i18n from '../../../../service/i18n'
import { usePopup } from '../../../../hooks/usePopup'
import AppTheme from '../../../../styles'
import Typography from '../../../../components/text'
import Icon from '../../../../components/icon'
import RNRestart from 'react-native-restart'

type ILanguageState = 'fr' | 'en' | 'ar'

const LanguageItem: React.FC = () => {
  const { t } = useTranslation()
  let languages = [
    {
      name: 'french',
      code: 'fr',
      source: require('../../../../assets/icons/fr.png'),
    },
    {
      name: 'english',
      code: 'en',
      source: require('../../../../assets/icons/en.png'),
    },
    {
      name: 'arabic',
      code: 'ar',
      source: require('../../../../assets/icons/ar.png'),
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
    RNRestart.restart()
  }
  return (
    <>
      <ListItem
        onPress={bottomSheet.open}
        containerStyle={styles.itemContainer}
      >
        <Icon name="translate" />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: 'bold' }}>
            {t('common:translation')}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron
          type="material-community"
          name="chevron-right"
          size={30}
        />
      </ListItem>
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
    </>
  )
}

export default LanguageItem

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    width: 50,
    height: 50,
    marginRight: 15,
    ...AppTheme.elevation,
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
    backgroundColor: AppTheme.colors.blue_b200,
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
  itemContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: AppTheme.borderRadius.default,
    ...AppTheme.elevation_light,
  },
})
