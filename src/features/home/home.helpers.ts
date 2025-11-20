import { IGame } from '@/types/Types'
import { deleteCollection } from '@/helpers/db/db.read'
import {
  getGameFromStorage,
  saveScoresToLocalStorage,
  updateStorage
} from '@/helpers/helpers.storage'

export function onStartFromScratch() {
  const game = getGameFromStorage() as IGame
  if (game) {
    updateStorage({
      ...game,
      roundQuestions: [],
      gameObject: game.gameObject.map(category => ({
        ...category,
        options: category.options.map(option => ({
          ...option,
          active: true
        }))
      }))
    })

    saveScoresToLocalStorage(null)
    deleteCollection()
  }
}

export function onGameJsonUpload(file: File, cb: any) {
  let reader = new FileReader()

  reader.readAsText(file)

  reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
    if (readerEvent?.target?.result) {
      let obj = JSON.parse(readerEvent.target.result as string)
      updateStorage({ roundQuestions: [], ...obj })
      cb?.()
    }
  }
}
