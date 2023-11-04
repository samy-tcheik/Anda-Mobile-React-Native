import { useReducer } from 'react'

interface State<T> {
  isOpen: boolean
  data?: T
}
interface Action<T> {
  type: 'close' | 'open'
  data?: T
}

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'open':
      return { isOpen: true, data: action.data }
    case 'close':
      return { isOpen: false, data: action.data }
  }
}

export function usePopup<TData>(defaultOpen?: boolean, defaultData?: TData) {
  const [state, dispatch] = useReducer<
    React.Reducer<State<TData>, Action<TData>>
  >(reducer, {
    isOpen: !!defaultOpen,
    data: defaultData,
  })

  const open = (data?: TData) => dispatch({ type: 'open', data })
  const onClose = (data?: TData) => dispatch({ type: 'close', data })

  return { ...state, open, onClose }
}
