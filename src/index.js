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
    return 'rgba(0, 0, 0, 0.7)'
  }

  return '#FFF'
}

const colors = ({ theme, isColor, isTone = 0, isInverted }) => {
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

  return [bgColor, textColor]
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

export const hasTextAlign = ({ hasTextAlign }) => {
  if (!hasTextAlign) return

  return css`
    text-align: ${hasTextAlign};
  `
}

export const isCircular = ({ isCircular }) => {
  if (!isCircular) return

  return css`
    border: 1px solid;
    border-radius: 999px;
  `
}

export const isHover = (props) => {
  let [bgColor, textColor] = colors(props)
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
  let [bgColor, textColor] = colors(props)
  let isOutlined = props.isOutlined

  let result = css`
    background-color: ${bgColor};
    color: ${textColor};
  `

  if (isOutlined) {
    result = css`
      color: ${bgColor};
      border-color: ${bgColor} !important;
    `
  }

  return result
}

export const helpersModifiers = [
  isDisplay,
  isHidden,
  isSize,
  isCircular,
  hasTextAlign
]

export const colorModifiers = [
  isColor,
  isHover
]

export const withModifiers = (Component, modifiers) => {
  return styled(Component)`
    ${p => modifiers.reduce((r, m) => css`
      ${m}
      ${r}
    `)}
  `
}
