import { css } from 'styled-components'
import * as color from './color'

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
  if (!theme.sizes[size]) return

  return css`
    font-size: ${theme.sizes[size]};
  `
}

export const withHover = p => {
  if (p.isStatic || !p.color) return

  let bgColor = color.bg(p)
  let textColor = color.text(p)
  let isOutlined = p.isOutlined
  let selector = p.isHover ? '&' : '&:hover'

  let result = css`
    ${selector} {
      background-color: ${color.hover(bgColor)};
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

export const withColor = (p) => {
  if (!p.color) return

  let bgColor = color.bg(p)
  let textColor = color.text(p)

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
