import { useState } from 'react'

interface IUseFilterProps {
  filters: string[]
}

export type IFilter = {
  [key: string]: any
}

export const useFilters = ({ filters }: IUseFilterProps) => {
  const [state, setState] = useState(() => {
    const filtersObject: { [key: string]: string } = {}
    filters.forEach((filter, i) => {
      filtersObject[filter] = ''
    })
    return filtersObject
  })
  return {
    setFilters: setState,
    filters: state,
  }
}
