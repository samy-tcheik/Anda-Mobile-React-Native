import { NavigationProp, RouteProp } from '@react-navigation/native'
import Typography from '../../../../components/text'
import AppLayout from '../../app-layout'
import { StyleSheet, View } from 'react-native'
import { Rating } from 'react-native-ratings'
import { IReviewForm, useReviewForm } from './use-form'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TextArea from '../../../../components/textarea'
import Button from '../../../../components/button'
import {
  useCreateUserReview,
  useUpdateUserReview,
  useUserReview,
} from './queries'
import { ReviewableType } from '../../../../enums/reviewableType'
import AppTheme from '../../../../styles'
import CustomeScrollView from '../../../../components/custom-scrollview'
import Loader from '../../../../components/loader'

interface Props {
  route: RouteProp<any>
  navigation: any
}

const CreateReviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { t } = useTranslation()
  const createReview = useCreateUserReview(
    ReviewableType.PLACE,
    route.params?.id
  )
  const updateReview = useUpdateUserReview(
    ReviewableType.PLACE,
    route.params?.id
  )
  const { data, isLoading, isFetched, fetchStatus } = useUserReview(
    ReviewableType.PLACE,
    route.params?.id,
    {
      enabled: route.params?.reviewed,
      onSuccess(data) {
        reset({ rating: data.rating, comment: data.comment })
      },
    }
  )
  const loading = isLoading && fetchStatus !== 'idle'

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    watch,
  } = useReviewForm({ rating: data?.rating!, comment: data?.comment! })
  const onSubmit = (data: IReviewForm) => {
    //I use reviewed data to know if i should update
    //or create a new review
    if (route.params?.reviewed) {
      updateReview.mutate(data, {
        onSuccess() {
          navigation.replace('review-success', route.params)
        },
      })
    } else {
      createReview.mutate(data, {
        onSuccess() {
          navigation.replace('review-success', route.params)
        },
      })
    }
  }

  return (
    <AppLayout backButton navigation={navigation}>
      {loading ? (
        <Loader />
      ) : (
        <CustomeScrollView>
          <View style={styles.container}>
            {/* <Typography.HeadlineHeavy style={{ textAlign: 'center' }}>
              {t('message:create_review_title')}
            </Typography.HeadlineHeavy> */}
            <Typography.TitleHeavy style={styles.description}>
              {t('message:create_review_message')}
            </Typography.TitleHeavy>
            <View style={styles.formControl}>
              <Typography.BodyHeavy style={{ marginTop: 20 }}>
                {t('message:rating_input_label')}
              </Typography.BodyHeavy>
              <Controller
                control={control}
                name="rating"
                render={({ field }) => (
                  <Rating
                    fractions={1}
                    jumpValue={1}
                    startingValue={field.value}
                    imageSize={30}
                    onFinishRating={field.onChange}
                    style={{ paddingVertical: 10 }}
                  />
                )}
              />
              {errors.rating && (
                <Typography.SmallLight style={styles.errorText}>
                  {errors.rating.message}
                </Typography.SmallLight>
              )}
            </View>
            <View>
              <Typography.BodyHeavy>
                {t('message:comment_input_label')}
              </Typography.BodyHeavy>
              <TextArea
                control={control}
                name="comment"
                multiline={true}
                numberOfLines={6}
                errorMessage={errors.comment?.message}
                error={!!errors.comment}
                inputContainerStyle={{ borderRadius: 10, marginTop: 20 }}
                inputStyle={{ textAlignVertical: 'top' }}
                returnKeyType="next"
                autoCapitalize="none"
                containerStyle={{ marginBottom: 5 }}
              />
            </View>
            <Button
              loading={createReview.isLoading || updateReview.isLoading}
              onPress={handleSubmit(onSubmit)}
            >
              {t('common:save')}
            </Button>
          </View>
        </CustomeScrollView>
      )}
    </AppLayout>
  )
}

export default CreateReviewScreen

const styles = StyleSheet.create({
  description: {
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 20,
  },
  formControl: {
    marginVertical: 20,
  },
  errorText: {
    color: AppTheme.colors.error_default,
  },
})
