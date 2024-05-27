import { StyleSheet, Text, View } from 'react-native'
import Background from '../../../../components/background'
import Header from '../../../../components/header'
import { Image } from '@rneui/base'
import { NavigationProp } from '@react-navigation/native'
import Button from '../../../../components/button'
import { useTranslation } from 'react-i18next'
import { useCodeCheck } from './query'
import { ICodeCheckForm, useCodeCheckForm } from './use-form'
import AppTheme from '../../../../styles'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useEffect, useState } from 'react'
import { usePopup } from '../../../../hooks/usePopup'
import ErrorModal from '../../../../components/error-modal'
import Typography from '../../../../components/text'

interface Props {
  navigation: NavigationProp<any>
}

export const CELL_SIZE = 70
export const CELL_BORDER_RADIUS = 8
export const DEFAULT_CELL_BG_COLOR = '#fff'
export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7'
export const ACTIVE_CELL_BG_COLOR = '#f7fafe'

const CELL_COUNT = 4

const CodeCheckScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation()
  const errorModal = usePopup<string>()
  const { mutate, isLoading } = useCodeCheck()
  const {
    handleSubmit,
    setValue: setFormValue,
    formState: { errors },
  } = useCodeCheckForm()
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const onSubmit = (data: ICodeCheckForm) => {
    mutate(data, {
      onSuccess() {
        navigation.navigate('reset-password', { code: data.code })
      },
      onError(res: any) {
        errorModal.open(res.response.data.message)
        setValue('')
      },
    })
  }
  useEffect(() => {
    setFormValue('code', value)
  }, [value])
  return (
    <Background>
      <Header backButton={true} onLeftClick={() => navigation.goBack()} />

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={require('../../../../assets/icons/forget-password.jpg')}
            style={{ height: 300, width: 300 }}
          />
        </View>
        <View style={styles.messageContainer}>
          <Typography.TitleHeavy style={{ textAlign: 'center' }}>
            {t('message:code_check_title')}
          </Typography.TitleHeavy>
          <Typography.CaptionLight style={{ textAlign: 'center' }}>
            {t('message:code_check_message')}
          </Typography.CaptionLight>
        </View>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <Button
        containerStyle={styles.buttonContainer}
        onPress={handleSubmit(onSubmit)}
      >
        {t('common:continue')}
      </Button>
      <ErrorModal {...errorModal} />
    </Background>
  )
}

export default CodeCheckScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 50,
  },
  //CodeField
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: {
    marginHorizontal: 20,
  },
  cell: {
    width: 70,
    height: 70,
    lineHeight: 65,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#00000030',
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: AppTheme.borderRadius.default,
    ...AppTheme.elevation_light,
  },
  focusCell: {
    borderColor: '#000',
  },
  messageContainer: {
    justifyContent: 'center',
    marginVertical: 40,
    paddingHorizontal: 20,
  },
  message: {
    textAlign: 'center',
    marginVertical: 5,
  },
})
