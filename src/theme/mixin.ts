export const mixinPosition = ({ b = '', r = '', l = '', t = '', w = '0', h = '0' }) => {
    return `
        content: '';
        position: absolute;
        ${t !== '' ? 'top:' + t : ''};
        ${r !== '' ? 'right:' + r : ''};
        ${b !== '' ? 'bottom:' + b : ''};
        ${l !== '' ? 'left:' + l : ''};
        width: ${w};
        height: ${h};
    `
}
