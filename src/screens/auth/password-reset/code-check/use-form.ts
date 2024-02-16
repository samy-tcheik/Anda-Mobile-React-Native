import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'

export interface ICodeCheckForm {
  code: string
}

export function useCodeCheckForm(defaultValues?: ICodeCheckForm) {
  const { t } = useTranslation()
  const schema = object().shape({
    code: string()
      .required(t('validation:email_required'))
      .matches(/^[0-9]+$/, t('validation:only_digits'))
      .min(4, t('validation:exactly_4'))
      .max(4, t('validation:exactly_4')),
  })

  return useForm<ICodeCheckForm>({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
