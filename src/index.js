import { isNumber, omit, keys } from 'lodash'
import { palette } from 'styled-theme'

export const is = (options) => (str) => options[str] || false
export const isOption = (...fn) => (str) => fn.some(element => element(str))
export const isBetween = (min, max) => (value) => (value >= min && value <= max)

export const isTone = isBetween(0, 4)
export const isColor = is({
  primary: true,
  secondary: true,
  success: true,
  danger: true,
  grayscale: true,
  black: true,
  white: true
})

export const tone = (p, defaultTone = 0) => {
  return isTone(p.isTone) ? p.isTone : defaultTone
}

export const color = (p, defaultColor = 'white') => {
  return isColor(p.isColor) ? palette(p.isColor, tone(p)) : defaultColor
}

export const toPx = value => {
  if (isNumber(value)) {
    return `${value}px`
  }

  return value
}

/**
 * Returns the proper palette from props or default to p.palette`
 * @example
 * <Button primary />
 * const Button = styled.button`
 *  color: ${p => palette(fromProps(p), 1)};
 * `
 */
export const fromProps = p => {
  if (p.isPrimary) return 'primary'
  if (p.isSecondary) return 'secondary'
  if (p.isSuccess) return 'success'
  if (p.isDanger) return 'danger'
  if (p.isGrayscale) return 'grayscale'
  if (p.isBlack) return 'black'
  if (p.isWhite) return 'white'

  return p.palette || 'black'
}

export const styleProps = p => {
  let result = {
    palette: p.palette,
    isPrimary: p.isPrimary,
    isSecondary: p.isSecondary,
    isSuccess: p.isSuccess,
    isDanger: p.isDanger,
    isGrayscale: p.isGrayscale,
    isBlack: p.isBlack,
    isWhite: p.isWhite,
    isOutlined: p.isOutlined,
    reverse: p.reverse
  }

  return result
}

export const removeStyleProps = p => {
  return omit(p, keys(styleProps({})))
}

export const isWhite = p => {
  return fromProps(p) === 'white'
}

export const isGrayscale = p => {
  return fromProps(p) === 'grayscale'
}

export const hasBorder = p => {
  return isWhite(p) || p.isOutlined
}

export const textColor = (p, defaultValue = 'grayscale') => {
  let tone = 0
  let paletteName = defaultValue
  let reverse = !p.isOutlined && !isWhite(p)

  if (p.isOutlined) {
    paletteName = fromProps(p)
  }

  if (isWhite(p)) {
    paletteName = defaultValue
  }

  return palette(paletteName, tone, reverse)
}

export const bgColor = (p, defaultValue = 'white') => {
  let paletteName = fromProps(p)
  let tone = isGrayscale(p) ? 1 : 0

  return p.isOutlined ? 'transparent' : palette(paletteName, tone)
}

export const borderColor = p => {
  let paletteName = fromProps(p)
  let tone = isGrayscale(p) ? 1 : 0

  if (isWhite(p)) {
    return palette('grayscale', 2)
  }

  return palette(paletteName, tone)
}

export const lum = (hex, value) => {
  hex = String(hex).replace(/[^0-9a-f]/gi, '')
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  value = value || 0

  var rgb = '#'
  var c
  var i

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + c * value), 255)).toString(16)
    rgb += ('00' + c).substr(c.length)
  }
  return rgb
}

export const darken = (f, value) => {
  return lum(f(), -value)
}

export const lighten = (f, value) => {
  return lum(f(), value)
}
