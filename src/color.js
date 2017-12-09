import { darken, lighten, parseToHsl } from 'polished'

export const hover = (color) => {
  if (parseToHsl(color).lightness > 0.2) {
    return darken(0.1, color)
  }

  return lighten(0.2, color)
}

export const invert = (color) => {
  if (parseToHsl(color).lightness > 0.55) {
    return 'rgba(0, 0, 0, 0.8)'
  }

  return '#FFF'
}

export const fromProps = ({ theme, color, tone = 0, isInverted }) => {
  let defaultColors = { bgColor: 'black', textColor: 'white' }

  if (!color) return defaultColors
  if (!theme.palettes[color]) return defaultColors

  let palette = theme.palettes[color]
  let bgColor = palette[tone]
  let textColor = invert(bgColor)

  if (isInverted) {
    textColor = palette[tone]
    bgColor = invert(textColor)
  }

  return { bgColor, textColor }
}

export const bg = (props) => {
  return fromProps(props).bgColor
}

export const text = (props) => {
  return fromProps(props).textColor
}
