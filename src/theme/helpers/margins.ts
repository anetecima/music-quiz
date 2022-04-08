export const makeMarginHelpers = () => {
    const d = ['t', 'r', 'b', 'l']
    const d2 = ['top', 'right', 'bottom', 'left']
    const n = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48]

    let r = ''

    n.forEach((type, x) => {
        d.forEach((dir, y) => {
            r += `.m-${dir}-${type} {margin-${d2[y]}: ${n[x]}px} `
        })
    })

    return r
}
