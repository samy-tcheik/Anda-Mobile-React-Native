import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { ILoginForm } from './type'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

export function useLoginForm(defaultValues?: ILoginForm) {
  const { t } = useTranslation()
  const schema = object().shape({
    email: string()
      .required(t('validation:email_required'))
      .email(t('validation:valid_email')),
    password: string()
      .required(t('validation:password_required'))
      .min(8, t('validation:password_min_8'))
      .max(32, t('validation:password_max_32')),
  })

  return useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
