import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import { styles } from './text.styles'

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasFocus: false,
      styles: [
        props.invisible ? styles.inputContainerStyleInvisible : styles.inputContainerStyle
      ],
      value: props.value || ''
    }

    this.inputRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return {
        value: props.value
      }
    }
    return null
  }

  onFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }

    if (this.props.invisible) return

    this.setState({
      hasFocus: true,
      styles: [styles.inputContainerStyle, styles.inputContainerStyleFocus],
    })
  }

  onBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }

    if (this.props.invisible) return

    this.setState({
      hasFocus: false,
      styles: styles.inputContainerStyle
    })
  }

  onChange = value => {
    const { onChangeText, name } = this.props

    this.setState({ value }, () => {
      onChangeText(name, value)
    })
  }

  clear = () => {
    this.inputRef.current.clear()
  }

  focus = () => {
    this.inputRef.current.focus()
  }

  render() {
    const {
      errorMessage,
      placeholder,
      secureTextEntry,
      height,
      multiline,
      invisible,
      autoCorrect,
      containerStyle,
      inputContainerStyle,
      inputStyle
    } = this.props
    const { value } = this.state
    const _containerStyle = invisible ? styles.containerStyleInvisible : styles.containerStyle


    return (
      <View>
        <Input
          {...this.props}
          ref={this.inputRef}
          placeholderTextColor={'rgb(205, 205, 205)'}
          onChangeText={this.onChange}
          placeholder={placeholder}
          errorStyle={{ color: 'red' }}
          errorMessage={errorMessage}
          onBlur={() => this.onBlur()}
          onFocus={() => this.onFocus()}
          secureTextEntry={secureTextEntry}
          containerStyle={[_containerStyle, containerStyle]}
          inputContainerStyle={[this.state.styles, {height}, inputContainerStyle]}
          inputStyle={[styles.inputStyle, inputStyle, multiline && { textAlignVertical: 'top'}]}
          value={value}
          autoCorrect={autoCorrect}
        />
      </View>
    )
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  icon: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  numberOfLines: PropTypes.number,
  multiline: PropTypes.bool,
  height: PropTypes.number
}

TextInput.defaultProps = {
  secureTextEntry: false,
  icon: null,
  onChangeText: () => {},
  placeholder: '',
  errorMessage: '',
  numberOfLines: 1,
  multiline: false,
  height: null,
  invisible: false,
  autoCorrect: true
}
