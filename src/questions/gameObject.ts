export type TypeOption = {
  points: number
  extraPoints: number
  songTitle: string
  question: 'artist' | 'song' | 'video'
  track: string
  answer: string
  active: boolean
  start?: number | string
  length?: number | string
}

export type TypeCategory = {
  categoryName: string
  image: string
  options: TypeOption[]
}
