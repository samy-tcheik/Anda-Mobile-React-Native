import { useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { ILoginForm } from './type'
import { yupResolver } from '@hookform/resolvers/yup'

export function useLoginForm(defaultValues?: ILoginForm) {
  const schema = object().shape({
    email: string().email().required('le champ email est obligatoir'),
    password: string()
      .min(8)
      .max(32)
      .required('un mot de passe est obligatoir'),
  })

  return useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
