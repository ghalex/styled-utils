import { isNumber } from 'lodash'
import { palette } from 'styled-theme'

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
export const fromProps = props => {
  if (props.isPrimary) return 'primary'
  if (props.isSecondary) return 'secondary'
  if (props.isSuccess) return 'success'
  if (props.isDanger) return 'danger'
  if (props.isGrayscale) return 'grayscale'
  if (props.isBlack) return 'black'

  return props.palette || 'white'
}

export const extractProps = props => {
  let result = {
    isPrimary: props.isPrimary,
    isSecondary: props.isSecondary,
    isSuccess: props.isSuccess,
    isDanger: props.isDanger,
    isGrayscale: props.isGrayscale,
    isBlack: props.isBlack,
    isWhite: props.isWhite,
    reverse: props.reverse
  }

  return result
}

export const isWhite = p => fromProps(p) === 'white'
export const hasBorder = p => isWhite(p) || p.isOutlined

export const textColor = (props, defaultValue = 'grayscale') => {
  let tone = 0
  let paletteName = defaultValue
  let reverse = !props.isOutlined && !isWhite(props)

  if (props.isOutlined) {
    paletteName = fromProps(props)
  }

  if (isWhite(props)) {
    paletteName = defaultValue
  }

  return palette(paletteName, tone, reverse)
}

export const bgColor = (props, defaultValue = 'white') => {
  let tone = (props.isGrayscale || props.palette === 'grayscale') ? 1 : 0
  let paletteName = fromProps(props)

  return props.isOutlined ? 'transparent' : palette(paletteName, tone)
}

export const borderColor = props => {
  let tone = props.isGrayscale ? 1 : 0
  let paletteName = fromProps(props)

  if (isWhite(props)) {
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
