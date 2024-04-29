import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useRef } from 'react'

export const useRefetchOnFocus = (refetch: () => void) => {
  const firstTimeRef = useRef(true)

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      refetch()
    }, [refetch])
  )
}
