import { Card, Icon, ListItem } from '@rneui/base'
import ReactNativeModal from 'react-native-modal'
import AppTheme from '../../../../styles'
import { useTranslation } from 'react-i18next'
import Loader from '../../../../components/loader'
import { ActivityIndicator } from 'react-native'

interface Props {
  open: (data?: string | undefined) => void
  onClose: (data?: string | undefined) => void
  reset: (data?: string | undefined) => void
  isOpen: boolean
  data?: string | undefined
  handleDeleteReview: (id: string) => void
  isDeleteLoading: boolean
}

const ReviewActionModal: React.FC<Props> = ({
  onClose,
  isOpen,
  data,
  handleDeleteReview,
  isDeleteLoading,
}) => {
  const { t } = useTranslation()
  return (
    <ReactNativeModal
      onBackdropPress={onClose}
      onDismiss={onClose}
      backdropOpacity={0.4}
      isVisible={isOpen}
    >
      <Card containerStyle={{ borderRadius: AppTheme.borderRadius.light }}>
        <ListItem
          containerStyle={{
            backgroundColor: AppTheme.colors.error_e200,
            borderRadius: AppTheme.borderRadius.light,
          }}
          onPress={() => handleDeleteReview(data!)}
        >
          {isDeleteLoading ? (
            <ActivityIndicator color={AppTheme.colors.blue_b400} size={20} />
          ) : (
            <Icon
              name="delete"
              type="material-community"
              color={AppTheme.colors.error_default}
            />
          )}

          <ListItem.Content>
            <ListItem.Title>{t('common:delete')}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </Card>
    </ReactNativeModal>
  )
}

export default ReviewActionModal
