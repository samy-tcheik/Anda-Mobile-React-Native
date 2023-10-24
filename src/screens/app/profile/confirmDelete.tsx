import { Dialog } from '@rneui/themed'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { useDeleteUser } from './queries'
import Typography from '../../../components/text'
import AppTheme from '../../../styles'

interface Props {
  open: (data?: unknown) => void
  onClose: () => void
  isOpen: boolean
  data?: unknown
}

const ConfirmDeleteDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const { mutate, isLoading } = useDeleteUser()
  const handleDelete = () => {
    mutate()
  }
  return (
    <Dialog
      style={{ backgroundColor: 'white' }}
      isVisible={isOpen}
      onBackdropPress={onClose}
    >
      <Dialog.Title
        titleStyle={{ fontSize: 25, textAlign: 'center' }}
        title={t('message:delete_my_account')}
      />
      <Typography.CaptionLight style={{ textAlign: 'center' }}>
        {t('message:confirm_delete_message')}
      </Typography.CaptionLight>

      <View style={styles.buttonsContainer}>
        <Dialog.Button
          titleStyle={{ fontSize: 20 }}
          onPress={onClose}
          containerStyle={styles.button}
        >
          {t('common:cancel')}
        </Dialog.Button>
        <Dialog.Button
          titleStyle={{ color: AppTheme.colors.error_default, fontSize: 20 }}
          loading={isLoading}
          onPress={handleDelete}
          containerStyle={styles.button}
        >
          {t('common:confirm')}
        </Dialog.Button>
      </View>
    </Dialog>
  )
}

export default ConfirmDeleteDialog

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '50%',
  },
})
