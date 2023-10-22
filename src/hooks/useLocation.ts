import GetLocation from 'react-native-get-location'

export function useLocation() {
  GetLocation.getCurrentPosition()
    .then((location) => console.log('Location', location))
    .catch((error) => {
      console.log(error)
    })
}
