import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { number, object, string } from 'yup'

export interface IReviewForm {
  rating: number
  comment: string
}

export const useReviewForm = (defaultValues: IReviewForm) => {
  const schema = object().shape({
    rating: number().required(),
    comment: string().min(100).required(),
  })

  return useForm<IReviewForm>({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
