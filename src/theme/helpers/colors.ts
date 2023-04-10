import { cGreen, cMint, cDark, cGrey, cDarkGrey, cLightGrey } from '../variables'

export const colorHelpers = `
    .c-mint {
        color: ${cMint};
    }
    .c-green {
        color: ${cGreen};
    }
    .c-dark {
        color: ${cDark};
    }
    .c-white {
        color: #fff;
    }
    .c-grey {
        color: ${cGrey};
    }
    .c-dark-grey {
        color: ${cDarkGrey};
    }
    .c-error {
        color: #ff0000;
    }
    .bg-mint {
        background-color: ${cMint};
    }
    .bg-grey {
        background-color: ${cLightGrey};
    }
    .bg-green {
        background-color: ${cGreen};
    }
    .bg-white {
        background-color: #fff;
    }
    .bg-dark {
        background-color: ${cDark};
    }
    .bg-transparent {
        background-color: transparent;
    }
    .transition {
        transition: all 0.3s;
    }
    .transparent {
        opacity: 0;
    }
`
