import React from 'react'

import { NOOP } from './noop'
import { TouchableOpacity, View } from 'react-native'
import { ACTIVE_OPACITY, colors } from './constants'
import { SvgText } from './SvgText'

export const ShowTitleButton = ({ onPress, disabled }) => {
  const _onPress = disabled ? NOOP : onPress
  const _opacity = disabled ? 0.7 : 1
  return (
    <TouchableOpacity
      activeOpacity={ACTIVE_OPACITY}
      onPress={_onPress}
      testID={"show-title-button"}
    >
      <View style={{
        width: 32,
        height: 32,
        paddingTop: 15,
        paddingRight: 5,
        paddingBottom: 5,
        opacity: _opacity
      }}>
        <SvgText
          text="T"
          height={24}
          width={24}
          color={colors.textMain}/>
      </View>
    </TouchableOpacity>
  )
}
