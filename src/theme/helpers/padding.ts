export const makePaddingHelpers = () => {
    let y = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48]
    let x = [...y]

    let res = ''

    y.forEach(yIndex => {
        x.forEach(xIndex => {
            res += `.p-${yIndex}-${xIndex} {padding: ${yIndex}px ${xIndex}px;} `
        })
    })

    return res
}
