import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Typography from './text'
import Icon from './icon'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  children: React.ReactNode
}

const ReadMoreWrapper: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation()
  const [collapse, setCollapse] = useState<boolean>()
  const [showReadMore, setShowReadMore] = useState<boolean>()
  const handleCollapse = () => {
    setCollapse(true)
  }

  const handleOnTextLayout = useCallback(({ nativeEvent: { lines } }: any) => {
    if (lines.length > 3) {
      setShowReadMore(true)
    }
  }, [])
  return (
    <View>
      <Typography.DescriptionLight
        numberOfLines={collapse ? undefined : 3}
        onTextLayout={handleOnTextLayout}
        style={styles.content}
      >
        {children}
      </Typography.DescriptionLight>
      {!collapse && showReadMore && (
        <TouchableOpacity
          onPress={handleCollapse}
          style={{ flexDirection: 'row' }}
        >
          <Typography.DescriptionHeavy>
            {t('common:read_more')}
          </Typography.DescriptionHeavy>
          <Icon name="chevron-down" />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default ReadMoreWrapper

const styles = StyleSheet.create({
  content: {
    lineHeight: 21,
  },
})
