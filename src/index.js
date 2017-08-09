import styled, { css } from 'styled-components'
import { darken, lighten, parseToHsl } from 'polished'

const hover = (color) => {
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

export const colors = ({ theme, withColor, withTone = 0, isInverted }) => {
  let defaultColors = ['rgba(0,0,0,0)', 'rgba(0,0,0,1)']

  if (!withColor) return defaultColors
  if (!theme.palettes[withColor]) return defaultColors

  let palette = theme.palettes[withColor]
  let bgColor = palette[withTone]
  let textColor = invert(bgColor)

  if (isInverted) {
    textColor = palette[withTone]
    bgColor = invert(textColor)
  }

  return { bgColor, textColor }
}

export const isHidden = ({ isHidden }) => {
  if (!isHidden) return

  return css`
    display: none;
  `
}

export const isCircular = ({ isCircular }) => {
  if (!isCircular) return

  return css`
    border-radius: 999px;
  `
}

export const isOutlined = (props) => {
  if (!props.isOutlined || !props.withColor) return

  let { bgColor } = colors(props)

  return css`
    color: ${bgColor};
    border-color: ${bgColor} !important;
  `
}

export const isPaddingless = ({ isPaddingless }) => {
  if (!isPaddingless) return
  return css`
    padding: 0 !important;
  `
}

export const isMarginless = ({ isMarginless }) => {
  if (!isMarginless) return
  return css`
    margin: 0 !important;
  `
}

export const withDisplay = ({ withDisplay }) => {
  if (!withDisplay) return

  return css`
    display: ${withDisplay};
  `
}

export const withSize = ({ theme, withSize }) => {
  if (!withSize) return
  if (!theme.sizes.font[withSize]) return

  const size = theme.sizes.font[withSize]

  return css`
    font-size: ${size};
  `
}

export const withHover = (props) => {
  if (props.isStatic || !props.withColor) return

  let { bgColor, textColor } = colors(props)
  let isOutlined = props.isOutlined

  let result = css`
    &:hover {
      background-color: ${hover(bgColor)};
    }
  `

  if (isOutlined) {
    result = css`
      &:hover {
        background-color: ${bgColor};
        color: ${textColor};
        & .icon {
          color: ${textColor};
        }
      }
    `
  }

  return result
}

export const withColor = (props) => {
  if (props.isOutlined || !props.withColor) return

  let { bgColor, textColor } = colors(props)

  return css`
    background-color: ${bgColor};
    color: ${textColor};
  `
}

export const helperModifiers = [
  isHidden,
  isCircular,
  isPaddingless,
  isMarginless,
  withDisplay
]

export const colorModifiers = [
  isOutlined,
  withColor,
  withHover
]

export const withModifiers = (Component, modifiers) => {
  return styled(Component)`
    ${modifiers.reduce((r, m) => css`
      ${m}
      ${r}
    `)}
  `
}
