import AsyncStorage from '@react-native-async-storage/async-storage'

export async function dispatchLoggedInEvent(token: string) {
  await AsyncStorage.setItem('user_token', token)
}

export async function dispatchLoggedOutEvent() {
  await AsyncStorage.removeItem('user_token')
}
