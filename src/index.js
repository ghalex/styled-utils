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

export const colors = ({ theme, color, tone = 0, isInverted }) => {
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

export const withDisplay = ({ display }) => {
  if (!display) return

  return css`
    display: ${display};
  `
}

export const withSize = ({ theme, size }) => {
  if (!size) return
  if (!theme.sizes.font[size]) return

  return css`
    font-size: ${theme.sizes.font[size]};
  `
}

export const withHover = p => {
  if (p.isStatic || !p.color) return

  let { bgColor, textColor } = colors(p)
  let isOutlined = p.isOutlined
  let selector = p.isHover ? '&' : '&:hover'

  let result = css`
    ${selector} {
      background-color: ${hover(bgColor)};
    }
  `

  if (isOutlined) {
    result = css`
      ${selector} {
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

export const bgColor = (p) => {
  if (!p.color) return
  return colors(p).bgColor
}

export const textColor = (p) => {
  if (!p.color) return
  return colors(p).textColor
}

export const withColor = (p) => {
  if (!p.color) return

  let { bgColor, textColor } = colors(p)

  if (p.isOutlined) {
    return css`
      color: ${bgColor};
      border-color: ${bgColor} !important;
  `
  }

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
