import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { object, string } from 'yup'

export const useUserForm = (defaultValues?: IUserForm) => {
  const { t } = useTranslation()
  const schema = object().shape({
    name: string().required(t('validaton:name_required')),
  })
  return useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
