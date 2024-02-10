import AsyncStorage from '@react-native-async-storage/async-storage'

export async function dispatchLoggedInEvent(bearer: string) {
  await AsyncStorage.setItem('user_token', bearer)
}

export async function dispatchLoggedOutEvent() {
  await AsyncStorage.removeItem('user_token')
}
