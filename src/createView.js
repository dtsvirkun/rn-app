import React, { PureComponent } from 'react'
import { Animated, Easing, Keyboard, Platform, View } from 'react-native'
import { CreatePostTitle } from './CreateTitile'
import { ShowTitleButton } from './showPostTitle'
import { Container, ContentRow, DescriptionInputWrapper } from './styles'

const DEFAULT_TITLE_X = -100
const DEFAULT_DESCRIPTION_Y = -45
const isIOS = Platform.OS === 'ios'

export class PostView extends PureComponent {
  viewRef = React.createRef()

  constructor(props) {
    super(props)
    this._visibility = new Animated.Value(0)
    this._descriptionPosition = new Animated.ValueXY({ x: 0, y: DEFAULT_DESCRIPTION_Y })
    this._titlePosition = new Animated.ValueXY({ x: DEFAULT_TITLE_X, y: 0 })
    this.state = {
      isTitleVisible: true,
      descriptionHeight: 150
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this._keyboardDidChangeFrameListener =
      Keyboard.addListener('keyboardDidChangeFrame', this.updateDescriptionViewHeight)
  }


  componentWillUnmount() {
    this._isMounted = false;
    this._keyboardDidChangeFrameListener.remove()
  }

  componentDidUpdate(prevProps): void {
    const { visible } = this.props
    if (prevProps.visible !== visible) {
      this.onVisibilityPropChange()
    }
  }

  onVisibilityPropChange = async () => {
    const { visible, titleRef } = this.props
    await this.toggleTitleVisibleState(visible)
    await this.animateTitleVisibility()
    if (visible) {
      titleRef.current.focus()
    }
  }

  toggleTitleVisibleState = (isTitleVisible) => new Promise(resolve => {
    this.setState({ isTitleVisible }, resolve)
  })

  animateTitleVisibility = () => {
    const { visible } = this.props
    let scale, posY, posX

    if (visible) {
      scale = 1
      posY = 0
      posX = 0
    } else {
      scale = 0
      posY = DEFAULT_DESCRIPTION_Y
      posX = DEFAULT_TITLE_X
    }
    console.log('visible', visible)

    return new Promise(resolve => {
      Animated.parallel([
        Animated.timing(this._titlePosition, {
          toValue: { x: posX, y: 0 },
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: !isIOS
        }),
        Animated.timing(this._descriptionPosition, {
          toValue: { x: 0, y: posY },
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: !isIOS
        }),
        Animated.timing(this._visibility, {
          toValue: scale,
          duration: 150,
          easing: Easing.ease,
          useNativeDriver: !isIOS
        })
      ]).start(resolve)
    })
  }

  updateDescriptionViewHeight = () => {
    const { visible } = this.props
    this.viewRef.current.measure((ox, oy, width, height) => {
      if (this._isMounted && height) {
        this.setState({ descriptionHeight })
      }
    })
  }

  render() {
    const {
      isTitleVisible,
      title,
      errors,
      titleRef,
      handleChange,
      showTitleButton
    } = this.props
    const { descriptionHeight } = this.state
    const titleStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        },
        ...this._titlePosition.getTranslateTransform()
      ]
    }

    const descriptionStyle = {
      transform: this._descriptionPosition.getTranslateTransform()
    }

    const height = errors && errors.description
      ? descriptionHeight - 15
      : descriptionHeight


    return (
      <View
        ref={this.viewRef}
      >
        <Container>
          <ShowTitleButton
            disabled={isTitleVisible}
            onPress={showTitleButton}/>
          <View
            style={{ flex: 1 }}
          >
            <ContentRow>
              <CreatePostTitle
                title={title}
                titleRef={titleRef}
                errors={errors}
                visible={isTitleVisible}
                titleStyle={titleStyle}
                handleChange={handleChange}
              />
            </ContentRow>
          </View>
        </Container>
      </View>
    )
  }
}

