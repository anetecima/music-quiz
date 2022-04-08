export const MEDIA_BREAKPOINTS = {
    xs: 500,
    sm: 768,
    md: 1024,
    lg: 1200,
    xl: 1920
}

const up = (width: number) => `@media (min-width: ${width}px)`
const down = (width: number) => `@media (max-width: ${width - 1}px)`
// const fromTo = (from, to) => `@media (min-width: ${from}px) and (max-width: ${to - 1}px)`

export const mediaXXs = down(321)
export const mediaSm = down(MEDIA_BREAKPOINTS.sm)

export const mediaXsUp = up(MEDIA_BREAKPOINTS.xs)
export const mediaSmUp = up(MEDIA_BREAKPOINTS.sm)
export const mediaMdUp = up(MEDIA_BREAKPOINTS.md)
export const mediaLgUp = up(MEDIA_BREAKPOINTS.lg)
