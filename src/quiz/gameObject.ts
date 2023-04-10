import { indieOptions } from '../questions/indiePop'
import { classicRock } from '../questions/classisRock'
import { aneteOptions } from '../questions/anetesFavorite'
import { options2022 } from '../questions/2022'
import { options2021 } from '../questions/2021'
import { optionsDouble } from '../questions/double'
import { optionsThree } from '../questions/threeLetters'
import { optionsIntro } from '../questions/justTheIntro'
import { optionsCovers } from '../questions/albumCovers'
import { optionsFood } from '../questions/food'
import { optionsWork } from '../questions/work'
import { optionsNEWFile } from '../questions/newFile'

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
export type TypeGameObject = TypeCategory[]

export const gameObject: TypeGameObject = [
  indieOptions,
  classicRock,
  options2022,
  options2021,
  optionsDouble,
  optionsThree,
  optionsIntro,
  optionsCovers,
  optionsFood,
  optionsWork,
  optionsNEWFile,
  aneteOptions
]
