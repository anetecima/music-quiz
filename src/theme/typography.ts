import { mediaSmUp } from './media'

export const typography = `
    h1,
    h2,
    h3,
    h4 {
        font-weight: 400;
        font-family: 'Rubik Beastly', serif;
    }
    //
    //h5,
    //h6 {
    //    font-weight: normal;
    //}
    //
    h1,
    h2 {
        font-size: 30px;
    }
    //
    //h2 {
    //    font-size: 16px;
    //}
    //
    h3 {
        font-size: 22px;
    }
    //
    //h4 {
    //    font-size: 14px;
    //}
    ${mediaSmUp} {
        h1 {
            font-size: 38px;
        }
    }
`
