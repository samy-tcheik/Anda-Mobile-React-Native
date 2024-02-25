import { StyleSheet, View } from 'react-native'
import { Rating } from 'react-native-ratings'
import Typography from './text'
import ProgressBar from 'react-native-progress/Bar'
import { useTranslation } from 'react-i18next'
import AppTheme from '../styles'
import { ITotalReviews } from '../screens/app/types'

interface Props {
  data: ITotalReviews
  rating: number
  reviewCount: number
}

const ReviewsViewer: React.FC<Props> = ({ data, rating, reviewCount }) => {
  const { t } = useTranslation()

  return (
    <View>
      <View style={styles.ratingContainer}>
        <Rating
          readonly
          imageSize={20}
          startingValue={rating}
          style={styles.rating}
        />
        <Typography.CaptionLight>
          {reviewCount} {t('common:reviews')}
        </Typography.CaptionLight>
      </View>
      <View style={styles.row}>
        <Typography.CaptionLight style={styles.label}>
          {t('common:excellent')}
        </Typography.CaptionLight>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            unfilledColor={AppTheme.colors.neutral_n10}
            borderWidth={0}
            height={10}
            width={null}
            progress={data.excellent.avg}
          />
        </View>
        <Typography.CaptionLight style={styles.count}>
          {data.excellent.count}
        </Typography.CaptionLight>
      </View>
      <View style={styles.row}>
        <Typography.CaptionLight style={styles.label}>
          {t('common:good')}
        </Typography.CaptionLight>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            unfilledColor={AppTheme.colors.neutral_n10}
            borderWidth={0}
            height={10}
            width={null}
            progress={data.good.avg}
          />
        </View>
        <Typography.CaptionLight style={styles.count}>
          {data.good.count}
        </Typography.CaptionLight>
      </View>
      <View style={styles.row}>
        <Typography.CaptionLight style={styles.label}>
          {t('common:average')}
        </Typography.CaptionLight>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            unfilledColor={AppTheme.colors.neutral_n10}
            borderWidth={0}
            height={10}
            width={null}
            progress={data.average.avg}
          />
        </View>
        <Typography.CaptionLight style={styles.count}>
          {data.average.count}
        </Typography.CaptionLight>
      </View>
      <View style={styles.row}>
        <Typography.CaptionLight style={styles.label}>
          {t('common:bad')}
        </Typography.CaptionLight>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            unfilledColor={AppTheme.colors.neutral_n10}
            borderWidth={0}
            height={10}
            width={null}
            progress={data.bad.avg}
          />
        </View>
        <Typography.CaptionLight style={styles.count}>
          {data.bad.count}
        </Typography.CaptionLight>
      </View>
      <View style={styles.row}>
        <Typography.CaptionLight style={styles.label}>
          {t('common:very_bad')}
        </Typography.CaptionLight>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            unfilledColor={AppTheme.colors.neutral_n10}
            borderWidth={0}
            height={10}
            width={null}
            progress={data.very_bad.avg}
          />
        </View>
        <Typography.CaptionLight style={styles.count}>
          {data.very_bad.count}
        </Typography.CaptionLight>
      </View>
    </View>
  )
}

export default ReviewsViewer

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rating: {
    marginRight: 15,
    marginLeft: 10,
    width: 80,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  label: { width: '20%' },
  progressBarContainer: { display: 'flex', flex: 1 },
  count: { marginLeft: 10 },
})
