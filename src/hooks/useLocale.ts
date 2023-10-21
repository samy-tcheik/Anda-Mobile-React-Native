import { getLocales } from 'react-native-localize'
export function useLocale() {
  const locales = getLocales()
  return locales[0]
}
