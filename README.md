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
import { combine, withHelpers, withColors } from 'styled-utils'


const Element = styled.a`
  padding: 10px 15px;
`

const Button = combine(Element, [
  withHelpers,
  withColors
])

const Main = props => {
  return (
    <div>
      <Button isGrayscale reverse>Click Me</Button>
      <Button isPrimary>Click Me</Button>
      <Button isPrimary reverse>Click Me</Button>
      <Button isSuccess>Click Me</Button>
    </div>
  )
}

export default Main
```