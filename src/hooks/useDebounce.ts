import { useEffect, useRef } from 'react'

export function useDebounce<TData>(
  callback: (args: TData) => void,
  delay: number
) {
  const timeoutRef = useRef<any>(null)

  useEffect(() => {
    // Cleanup the previous timeout on re-render
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const debouncedCallback = (args: TData) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(args)
    }, delay)
  }

  return debouncedCallback
}
