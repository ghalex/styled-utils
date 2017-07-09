# styled-utils

[![npm](https://img.shields.io/npm/dm/styled-utils.svg)](https://www.npmjs.com/package/styled-utils)
[![npm](https://img.shields.io/npm/v/styled-utils.svg)](https://www.npmjs.com/package/styled-utils)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Introduction
`styled-utils` is a collection of util functions for [styled-components](https://github.com/styled-components/styled-components)

# Installation

```
npm install styled-utils --save
```
```
yarn add styled-utils
```

# Usage

Play with it [here](https://www.webpackbin.com/bins/-KocYWcF9u3vyfYcKUcr)

# Example

```javascript
import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'
import { fromProps, toPx } from 'styled-utils'
import { onMobile, onTablet } from 'styled-utils/mq'

// Make window small to test onMobile, onTablet
const Wrapper = styled.div`
  border: 1px solid black;
  padding: ${p => toPx(p.padding) || '10px'};
  > * { margin: 0 5px; }

  ${onMobile} {
    border: 1px solid red;
  }

  ${onTablet} {
    border: 1px solid blue;
  }
`

const Button = styled.a`
  padding: 10px 15px;
  border: ${p => p.withBorder ? '1px solid' : '0'};
  border-color: ${p => palette(fromProps(p), 0)};
  color: ${palette('grayscale', 0, true)};
  background-color: ${p => palette(fromProps(p), 1)};
`

const Main = props => {
  return (
    <Wrapper padding={20}>
      <Button isGrayscale reverse>Click Me</Button>
      <Button isPrimary>Click Me</Button>
      <Button isPrimary reverse>Click Me</Button>
      <Button isSuccess>Click Me</Button>
    </Wrapper>
  )
}

export default Main
```