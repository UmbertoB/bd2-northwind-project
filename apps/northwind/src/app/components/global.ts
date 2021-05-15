import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background: #f2f5ff;
  }

  h1,h2,h3 {
    margin: 0;
  }

  h1 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 5px;
  }

`
export default GlobalStyle;