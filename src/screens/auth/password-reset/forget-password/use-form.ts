import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

export interface IForgetPasswordForm {
  email: string
}

export function useForgetPasswordForm(defaultValues?: IForgetPasswordForm) {
  const { t } = useTranslation()
  const schema = object().shape({
    email: string()
      .required(t('validation:email_required'))
      .email(t('validation:valid_email')),
  })

  return useForm<IForgetPasswordForm>({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
