import React from 'react';
import { Svg, Text } from 'react-native-svg';

export const SvgText = ({ height = 20, width = 20, size,  text, color }) => {
  return (
    <Svg height={height} width={width}>
      <Text
        fill={color}
        fontSize={size || height}
        fontWeight="bold"
        y={20}
        textAnchor="start"
      >
        {text}
      </Text>
    </Svg>
  )
}
