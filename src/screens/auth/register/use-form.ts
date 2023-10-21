import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { object, ref, string } from 'yup'
import { IRegisterForm } from './type'

export function useRegisterForm(defaultValues?: IRegisterForm) {
  const schema = object().shape({
    name: string().required('Le champ nom est obligatoir'),
    email: string().email().required('Le champ email est obligatoir'),
    password: string().min(8).required('Le champ mot de passe est requis'),
    password_confirmation: string()
      .oneOf([ref('password')], 'Veuillez confirmer le mot de passe')
      .required('Le champ confirmation de mot de passe est requis'),
  })

  return useForm<IRegisterForm>({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
