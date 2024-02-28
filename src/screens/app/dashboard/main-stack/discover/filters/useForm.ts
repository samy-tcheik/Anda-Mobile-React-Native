import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { array, mixed, number, object, string } from 'yup'

export interface IFiltersForm {
  wilaya_id?: string
  town_id?: string
  range?: number
  category_id?: string[]
  active?: boolean
}

export function useFiltersForm(defaultValues: IFiltersForm) {
  const schema = object().shape({
    wilaya_id: string(),
    town_id: string(),
    range: mixed(),
    category_id: mixed(),
  })

  return useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })
}
