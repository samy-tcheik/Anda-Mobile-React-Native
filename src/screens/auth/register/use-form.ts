import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { object, ref, string } from 'yup'
import { IRegisterForm } from './type'
import { useTranslation } from 'react-i18next'

export function useRegisterForm(defaultValues?: IRegisterForm) {
  const { t } = useTranslation()
  const schema = object().shape({
    name: string().required(t('validation:name_required')),
    email: string()
      .required(t('validation:email_required'))
      .email(t('validation:valid_email')),
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

  return useForm<IRegisterForm>({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
