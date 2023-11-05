import GetLocation from 'react-native-get-location'

export function useLocation() {
  GetLocation.getCurrentPosition()
  console.log()
}
