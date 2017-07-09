import { isNumber } from 'lodash'

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
export const fromProps = (props) => {
  if (props.isPrimary) return 'primary'
  if (props.isSecondary) return 'secondary'
  if (props.isSuccess) return 'success'
  if (props.isDanger) return 'danger'
  if (props.isGrayscale) return 'grayscale'

  return props.palette || 'white'
}
