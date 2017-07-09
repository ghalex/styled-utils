import { isNumber } from 'lodash'

export const toPx = value => {
  if (isNumber(value)) {
    return `${value}px`
  }

  return value
}
