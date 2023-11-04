import React from 'react'
import { StyleSheet } from 'react-native'
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown'
const Select: React.FC<SelectDropdownProps> = (props) => {
  return (
    <SelectDropdown
      {...props}
      rowStyle={styles.RowStyle}
      rowTextStyle={styles.RowTxtStyle}
      buttonStyle={styles.BtnStyle}
      buttonTextStyle={styles.BtnTxtStyle}
    />
  )
}

export default Select

const styles = StyleSheet.create({
  RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  RowTxtStyle: { color: '#444', textAlign: 'left' },
  BtnStyle: {
    marginTop: 10,
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#878787',
  },
  DropdownStyle: { backgroundColor: '#EFEFEF' },
  BtnTxtStyle: { color: '#444', textAlign: 'left' },
})
