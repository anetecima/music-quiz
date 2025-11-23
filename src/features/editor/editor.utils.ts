import type { IGame, IGameCategory } from '@/types/Types'
import { Question } from '../../const'

export const newCategory = (): IGameCategory => ({
  categoryName: 'Untitled',
  image: '',
  options: [
    {
      ...Question
    }
  ]
})

export const downloadToFile = (data: IGame) => {
  let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
  let downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', 'my_amazing_game.json')
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}
