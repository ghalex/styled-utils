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
import styled, { ThemeProvider } from 'styled-components'
import { combine, withHelpers, withColors } from 'styled-utils'


const Element = styled.a`
  display: inline-block;
  padding: 10px 15px;
  border: 1px solid transparent;
  border-radius: 5px;
  margin: 0 5px 5px 0;
`

const Button = combine(Element, [
  withHelpers,
  withColors
])

const theme = {}

theme.palette = {
  primary: ['#1b8ceb', '#106cb9'],
  success: ['#4caf50', '#388e3c'],
  danger: ['#e91e63', '#c2185b'],
  white: ['#fff', '#fff']
}

theme.sizes = {
  maxWidth: '600px',
  font: {tiny: '0.55rem', small: '0.75rem', medium: '1rem', large: '1.25rem', big: '1.5rem', huge: '2rem'}
}

const Main = props => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button isColor='primary'>Click Me</Button>
        <Button isColor='success'>Click Me</Button>
        <Button isColor='danger' isOutlined>Click Me</Button>
        <Button isColor='white' isInverted>Click Me</Button>
        <Button isColor='primary' isDisplay='block' isSize='large' hasTextAlign='center'>Click Me</Button>
        <Button isColor='primary' isSize='tiny'>Click Me</Button>
      </div>
    </ThemeProvider>
  )
}

export default Main
```