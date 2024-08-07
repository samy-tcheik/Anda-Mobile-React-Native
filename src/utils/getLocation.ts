import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation'

export default function getUserLocation() {
  return new Promise<GeolocationResponse>((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve(position)
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 5,
      }
    )
  })
}
