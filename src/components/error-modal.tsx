import { Card, Image } from '@rneui/base'
import { StyleSheet, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import Typography from './text'
import { useTranslation } from 'react-i18next'
import Button from './button'
import AppTheme from '../styles'

interface Props extends React.ComponentProps<typeof ReactNativeModal> {
  open: (data?: string | undefined) => void
  onClose: (data?: string | undefined) => void
  reset: (data?: string | undefined) => void
  isOpen: boolean
  data?: string | undefined
}

const ErrorModal: React.FC<Partial<Props>> = ({
  data,
  onClose,
  isOpen,
  ...props
}) => {
  const { t } = useTranslation()
  const onDismiss = () => onClose!()
  const onBackdropPress = () => onClose!()
  return (
    <ReactNativeModal
      {...props}
      onDismiss={onDismiss}
      onBackdropPress={onBackdropPress}
      isVisible={isOpen}
      backdropOpacity={0.2}
    >
      <Card containerStyle={styles.card}>
        <View style={styles.errorIconContainer}>
          <Image
            resizeMode="contain"
            source={require('../assets/icons/error.png')}
            style={{ height: 70, width: 70 }}
          />
        </View>
        <View style={styles.content}>
          <Typography.SubheaderHeavy>
            {t('common:error')}
          </Typography.SubheaderHeavy>
          <Typography.BodyLight>{data}</Typography.BodyLight>
          <Button
            containerStyle={styles.loginButtonContainer}
            buttonStyle={styles.loginButton}
            onPress={onDismiss}
          >
            {t('common:try_again')}
          </Button>
        </View>
      </Card>
    </ReactNativeModal>
  )
}

export default ErrorModal

const styles = StyleSheet.create({
  card: {
    borderRadius: 7,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIconContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginButtonContainer: {
    borderRadius: 50,
    width: '70%',
    marginVertical: 20,
  },
  loginButton: {
    padding: 15,
    backgroundColor: AppTheme.colors.error_light,
  },
})
