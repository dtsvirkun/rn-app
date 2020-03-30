import React from 'react'
import { Animated } from 'react-native'
import TextInput from './textInput'
import { TitleInputWrapper, TitleRow } from './styles'

const TITLE_MAX_LENGTH = 150

export const CreatePostTitle = ({ handleChange, errors, title, titleRef, titleStyle }) => {
  return (
    <TitleRow
      as={Animated.View}
      style={titleStyle}>
      <TitleInputWrapper>
        <TextInput
          testID="test-id-title"
          name={'title'}
          ref={titleRef}
          onChangeText={handleChange}
          placeholder="Add a title"
          errorMessage={errors && errors.title}
          value={title}
          invisible
          maxLength={TITLE_MAX_LENGTH}
          inputStyle={{
            fontSize: 18,
            fontWeight: 'bold'
          }}
          inputContainerStyle={{
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
          }}
        />
      </TitleInputWrapper>
    </TitleRow>
  )
}
