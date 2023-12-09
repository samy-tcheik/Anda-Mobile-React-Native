import { StyleSheet, View } from 'react-native'
import { IComment } from '../screens/app/dashboard/comments/type'

interface Props {
  data: IComment
}

const CommentItem: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.author}>Author</View>
      <View></View>
    </View>
  )
}

export default CommentItem

const styles = StyleSheet.create({
  container: {},
  author: {},
})
