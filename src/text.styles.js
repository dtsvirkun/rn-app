import { StyleSheet } from 'react-native'
import { colors } from "./constants"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60
  },
  containerStyle: {
    marginBottom: 16,
    paddingHorizontal: 0
  },
  inputContainerStyle: {
    backgroundColor: colors.backgroundPrimary,
    borderColor: colors.border,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    height: 48,
  },
  inputContainerStyleFocus: {
    borderColor: colors.koromiko,
  },
  containerStyleInvisible: {
    paddingHorizontal: 0
  },
  inputContainerStyleInvisible: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(0,0,0,0)',
    borderRadius: 0,
    borderWidth: 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    height: 48,
  },
  inputStyle: {
    fontSize: 18,
  }
})

