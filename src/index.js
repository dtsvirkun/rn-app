import React, { createRef } from 'react'
import { Alert, SafeAreaView, Text, View } from 'react-native'
import { PostView } from './createView'
import { debounce } from 'lodash'

const defaultState = {
  title: '',
  description: '',
  errors: {},
  photo: null,
  uploadingFiles: false,
  descriptionFocused: false,
  isTitleVisible: false,
  usersInSeparateCommentThreads: false,
  isLoading: false,
  isAttachmentsVisible: true
}

class App extends React.Component {


  constructor(props) {
    super(props)
    this.state = Object.assign({}, defaultState)
    this.debounceEmitSearch = debounce(this.emitSearch, 200)
    this.titleRef = createRef()
    this.descriptionRef = createRef()
  }
  onDescriptionFocus = () => {
    this.setState(prevState => ({
      ...prevState,
      descriptionFocused: true
    }))
  }

  emitSearch(value) {
    this.setState(prevState => ({
      ...prevState,
      'shareToVal': value,
      errors: {
        ...prevState.errors,
        'shareToVal': ''
      }
    }))
  }

  onDescriptionBlur = () => {
    this.setState(prevState => ({
      ...prevState,
      descriptionFocused: false
    }))
  }

  showTitleButton = () => {
    this.setState(prevState => ({
      ...prevState,
      isTitleVisible: !prevState.isTitleVisible
    }))
  }

  handleChange = (name, value) => {
    if (name === 'shareToVal') {
      this.debounceEmitSearch(value)
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          newPostTo: ''
        }
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        [name]: value,
        errors: {
          ...prevState.errors,
          [name]: ''
        }
      }))
    }
  }


  render() {

    const {
      errors,
      isTitleVisible,
      description,
    } = this.state

    return (

      <SafeAreaView>
        <PostView
          visible={isTitleVisible}
          title={this.state.title}
          description={description}
          errors={errors}
          titleRef={this.titleRef}
          descriptionRef={this.descriptionRef}
          handleChange={this.handleChange}
          showTitleButton={this.showTitleButton}
          onDescriptionFocus={this.onDescriptionFocus}
          onBlur={this.onDescriptionBlur}
        />
      </SafeAreaView>
    )
  }
}




export default App;
