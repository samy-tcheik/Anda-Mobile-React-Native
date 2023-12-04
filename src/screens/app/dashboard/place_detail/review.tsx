import { BottomSheet } from '@rneui/base'
import { StyleSheet, View } from 'react-native'
import Typography from '../../../../components/text'
import { Rating } from 'react-native-ratings'
import AppTheme from '../../../../styles'
import { useUpdateRating, useUserPlaceRating } from '../../queries'
import { IPlace } from '../../types'
import Button from '../../../../components/button'
import { showMessage } from 'react-native-flash-message'
import Icon from '../../../../components/icon'
import { useState } from 'react'

interface Props {
  open: (data?: IPlace) => void
  onClose: (data?: IPlace) => void
  isOpen: boolean
  data?: IPlace
}

const ReviewSection: React.FC<Props> = ({ onClose, isOpen, data }) => {
  const [rating, setRating] = useState<number>(0)
  const userPlaceRating = useUserPlaceRating(data?.id!, {
    enabled: isOpen,
  })
  const { mutate, isLoading } = useUpdateRating(data?.id!)
  console.log('user Rating', userPlaceRating)
  const onSubmit = () => {
    mutate(
      {
        rating: rating,
      },
      {
        onSuccess(data) {
          showMessage({
            message: 'success',
            type: 'success',
            icon: (props: any) => (
              <Icon name="check" color="white" size={20} {...props} />
            ),
          } as any)
          onClose()
        },
      }
    )
  }
  return (
    <BottomSheet onBackdropPress={onClose} isVisible={isOpen}>
      <View style={styles.bottomSheetContainer}>
        {userPlaceRating.isLoading ? (
          <Typography.BodyHeavy>Is Loading</Typography.BodyHeavy>
        ) : (
          <>
            <Typography.HeadlineHeavy style={{ textAlign: 'center' }}>
              Place Review
            </Typography.HeadlineHeavy>
            <Typography.CaptionLight style={styles.description}>
              Leave us a review and share your thoughts! Thank you for being a
              part of our community.
            </Typography.CaptionLight>
            <Rating
              fractions={1}
              jumpValue={0.5}
              imageSize={30}
              startingValue={data?.rating}
              onFinishRating={setRating}
              style={{ paddingVertical: 10 }}
            />
            {/* <Typography.CaptionLight>
          Please leave your comment here
        </Typography.CaptionLight>
        <TextInput
          style={styles.inputContainerStyle}
          numberOfLines={5}
          multiline={true}
          placeholder="Commentaire"
        /> */}
            <Button onPress={onSubmit} loading={isLoading}>
              Send
            </Button>
          </>
        )}
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  description: {
    textAlign: 'center',
  },
  inputContainerStyle: {
    width: '100%',
    textAlignVertical: 'top',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    ...AppTheme.elevation,
  },
})

export default ReviewSection
