import { IQuestion } from '@/types/Types'
import { doc, setDoc } from '@firebase/firestore'
import { DOC_NAME } from '@/helpers/db/db.cons'
import { db } from '@/helpers/firebaseConfig'

export const writeToDb = async (song: IQuestion) => {
  if (song && song?.track) {
    await setDoc(doc(db, DOC_NAME, song.track), { ...song, timestamp: Date.now() })
  }
}

export const writeScoresToDb = async (table: any) => {
  if (table) {
    // await setDoc(doc(db, 'scores', 'game'), table)
  }
}
