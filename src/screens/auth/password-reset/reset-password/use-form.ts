import { useForm } from 'react-hook-form'
import { object, ref, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

export interface IResetPasswordForm {
  password: string
  password_confirmation: string
}

export function useResetPasswordForm(defaultValues?: IResetPasswordForm) {
  const { t } = useTranslation()
  const schema = object().shape({
    password: string()
      .required(t('validation:password_required'))
      .min(8, t('validation:password_min_8'))
      .max(32, t('validation:password_max_32')),
    password_confirmation: string()
      .required(t('validation:password_confirmation_required'))
      .oneOf(
        [ref('password')],
        t('validation:password_confirmation_not_match')
      ),
  })

  return useForm<IResetPasswordForm>({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
