import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { number, object, string } from 'yup'

export interface IReviewForm {
  rating: number
  comment: string
}

export const useReviewForm = (defaultValues: IReviewForm) => {
  const { t } = useTranslation()
  const schema = object().shape({
    rating: number().required(t('validation:rating_required')),
    comment: string()
      .min(100, t('validation:comment_min_100'))
      .required(t('validation:comment_required')),
  })

  return useForm<IReviewForm>({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
