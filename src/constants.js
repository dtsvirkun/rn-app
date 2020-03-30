import { Dimensions, PixelRatio } from 'react-native'

export const ACTIVE_OPACITY = 0.7

export const colors = {
  powderBlue: 'rgb(197, 219, 235)',
  regalBlue: 'rgb(33, 59, 86)',
  mutedBlue: 'rgb(56, 104, 160)',
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  baseColor: 'rgb(53, 56, 62)',
  textColor: 'rgb(62, 64, 68)',
  lightGray: 'rgb(153, 153, 153)',
  energyYellow: 'rgb(246, 205, 78)',
  lightGreyBlue: 'rgb(127, 175, 211)',
  placeholder: 'rgb(205, 205, 205)',
  darkViolet: 'rgb(51, 3, 60)',
  primary: 'rgb(56, 104, 160)',
  greyBlue: 'rgb(99, 129, 164)',
  whiteSmoke: 'rgb(205, 206, 211)',
  // new design
  textMain: '#1D2437',
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#EBEBEB',
  border: '#DBDBDB',
  koromiko: '#FFB34C',
  koromikoRGB: 'rgb(255, 179, 76)',
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
export const window = {
  width,
  height
}
const scale = width / 320

export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

export default {
  window: {
    width,
    height
  },
  colors,
  isSmallDevice: width < 375
}
