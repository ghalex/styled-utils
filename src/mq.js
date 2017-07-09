export const breakpoints = {
  MOBILE: '340px',
  TABLET: '740px',
  DESKTOP: '1200px'
}

let { MOBILE, TABLET, DESKTOP } = breakpoints

export const mq = ({from, to}) => {
  if (!from) {
    return `@media (max-width: ${to}) `
  }

  if (from && !to) {
    return `@media (min-width: ${from})`
  }

  let media = `@media (min-width: ${from}) and (max-width: ${to}) `
  return media
}

export const onMobile = mq({from: 0, to: MOBILE})
export const onTablet = mq({from: MOBILE, to: TABLET})
export const onDesktop = mq({from: TABLET})

export const onMobileAndTablet = mq({from: 0, to: TABLET})
export const onTabletAndDesktop = mq({from: TABLET, to: DESKTOP})
