import { typography } from './typography'
import { flexHelpers } from './helpers/flex'
import { textHelpers } from './helpers/text'
import { colorHelpers } from './helpers/colors'
import { positionHelpers } from './helpers/position'
import { makePaddingHelpers } from './helpers/padding'
import { makeMarginHelpers } from './helpers/margins'
import { displayHelpers } from './helpers/display'
import { borderHelpers } from './helpers/borders'
import { cDark } from './variables'

export const GlobalStyles = `
    ${typography}
    ${flexHelpers}
    ${textHelpers}
    ${colorHelpers}
    ${positionHelpers}
    ${displayHelpers}
    ${borderHelpers}
    ${makePaddingHelpers()}
    ${makeMarginHelpers()}

    html {
        font-weight: 400;
    }
    
    body {
        color: ${cDark};
    }
        
    button {
        color: ${cDark};
        border: 0;
        outline: none;
        font-size: inherit;
        font-family: inherit;
        cursor: pointer;
    }
    
    svg {
        display: block;
    } 
    
    *{box-sizing: border-box;}
`
