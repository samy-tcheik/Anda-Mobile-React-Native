import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { object, string } from 'yup'

export interface ICommentForm {
  comment: string
}

export function useCommentForm(defaultValues?: ICommentForm) {
  const schema = object().shape({
    comment: string().required(),
  })
  return useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
