import styled, { css } from 'styled-components'
import { darken, parseToHsl } from 'polished'

export const is = (options) => (str) => options[str] || false
export const isOption = (...fn) => (str) => fn.some(element => element(str))
export const isBetween = (min, max) => (value) => (value >= min && value <= max)

export const invert = (color) => {
  if (parseToHsl(color).lightness > 0.55) {
    return 'rgba(0, 0, 0, 0.7)'
  }

  return '#FFF'
}

const isHidden = ({ isHidden }) => {
  if (!isHidden) return

  return css`
    display: none;
  `
}

const isDisplay = ({ isDisplay }) => {
  if (!isDisplay) return

  return css`
    display: ${isDisplay};
  `
}

const isSize = ({ theme, isSize }) => {
  if (!isSize) return
  if (!theme.sizes.font[isSize]) return

  const size = theme.sizes.font[isSize]

  return css`
    font-size: ${size};
  `
}

const hasTextAlign = ({ hasTextAlign }) => {
  if (!hasTextAlign) return

  return css`
    text-align: ${hasTextAlign};
  `
}

const isColor = ({ theme, isColor, isOutlined, isInverted, isTone = 0 }) => {
  if (!isColor) return
  if (!theme.palettes[isColor]) return

  let palette = theme.palettes[isColor]
  let bgColor = palette[isTone]
  let textColor = invert(bgColor)

  if (isInverted) {
    textColor = palette[isTone]
    bgColor = invert(textColor)
  }

  let result = css`
    background-color: ${bgColor};
    color: ${textColor};
    &:hover {
      background-color: ${darken(0.1, bgColor)};
    }
  `

  if (isOutlined) {
    result = css`
      color: ${bgColor};
      border-color: ${bgColor} !important;
      &:hover {
        background-color: ${bgColor};
        color: ${textColor};
      }
    `
  }

  return result
}

export const combine = (Component, f) => {
  return f.length > 0 ? f.reduce((c, fn) => {
    let SFC = fn(c)

    SFC.defaultProps = Component.defaultProps
    SFC.displayName = Component.displayName || Component.name

    return SFC
  }, Component) : Component
}

export const withHelpers = (Component) => {
  return styled(Component)`
    ${isDisplay}
    ${isHidden}
    ${isSize}
    ${hasTextAlign}
  `
}

export const withColors = (Component) => {
  return styled(Component)`
    ${isColor}
  `
}
