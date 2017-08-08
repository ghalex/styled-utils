import styled, { css } from 'styled-components'
import { darken, lighten, parseToHsl } from 'polished'

const hover = (color) => {
  if (parseToHsl(color).lightness > 0.2) {
    return darken(0.1, color)
  }

  return lighten(0.2, color)
}

const invert = (color) => {
  if (parseToHsl(color).lightness > 0.55) {
    return 'rgba(0, 0, 0, 0.8)'
  }

  return '#FFF'
}

export const colors = ({ theme, isColor, isTone = 0, isInverted }) => {
  let defaultColors = ['rgba(0,0,0,0)', 'rgba(0,0,0,1)']

  if (!isColor) return defaultColors
  if (!theme.palettes[isColor]) return defaultColors

  let palette = theme.palettes[isColor]
  let bgColor = palette[isTone]
  let textColor = invert(bgColor)

  if (isInverted) {
    textColor = palette[isTone]
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

export const isDisplay = ({ isDisplay }) => {
  if (!isDisplay) return

  return css`
    display: ${isDisplay};
  `
}

export const isSize = ({ theme, isSize }) => {
  if (!isSize) return
  if (!theme.sizes.font[isSize]) return

  const size = theme.sizes.font[isSize]

  return css`
    font-size: ${size};
  `
}

export const isCircular = ({ isCircular }) => {
  if (!isCircular) return

  return css`
    border: 1px solid transparent;
    border-radius: 999px;
  `
}

export const isHover = (props) => {
  if (props.isStatic) return

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

export const isColor = (props) => {
  if (props.isOutlined) return

  let { bgColor } = colors(props)

  return css`
    background-color: ${bgColor};
  `
}

export const isTextColor = (props) => {
  let { textColor } = colors(props)

  return css`
    color: ${textColor};
  `
}

export const isOutlined = (props) => {
  if (!props.isOutlined) return

  let { bgColor } = colors(props)

  return css`
    color: ${bgColor};
    border-color: ${bgColor} !important;
    background-color: transparent;
  `
}

const isPaddingless = ({ isPaddingless }) => {
  if (!isPaddingless) return
  return css`
    padding: 0 !important;
  `
}

const isMarginless = ({ isMarginless }) => {
  if (!isMarginless) return
  return css`
    margin: 0 !important;
  `
}

export const helperModifiers = [
  isDisplay,
  isHidden,
  isCircular,
  isPaddingless,
  isMarginless
]

export const colorModifiers = [
  isColor,
  isTextColor,
  isOutlined,
  isHover
]

export const withModifiers = (Component, modifiers) => {
  return styled(Component)`
    ${modifiers.reduce((r, m) => css`
      ${m}
      ${r}
    `)}
  `
}
