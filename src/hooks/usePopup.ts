import { useReducer } from 'react'

interface State<T> {
  isOpen: boolean
  data?: T
}
interface Action<T> {
  type: 'close' | 'open' | 'reset'
  data?: T
}

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'open':
      return { ...state, isOpen: true, data: action.data }
    case 'close':
      return { ...state, isOpen: false, data: action.data }
    case 'reset':
      return { ...state, data: action.data }
  }
}

export function usePopup<TData>(defaultOpen?: boolean, defaultData?: TData) {
  const [state, dispatch] = useReducer<
    React.Reducer<State<TData>, Action<TData>>
  >(reducer, {
    isOpen: !!defaultOpen,
    data: defaultData,
  })
  console.log('usePopup state', state)
  const open = (data?: TData) => dispatch({ type: 'open', data })
  const onClose = (data?: TData) => dispatch({ type: 'close', data })
  const reset = (data?: TData) => dispatch({ type: 'reset', data })

  return { ...state, open, onClose, reset }
}
