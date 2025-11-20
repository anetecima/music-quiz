import type { IQuestion } from '@/types/Types'
import { ref, remove, set, update } from 'firebase/database'
import { DOC_NAME } from '@/helpers/db/db.cons'
import { db } from '@/helpers/firebaseConfig'

export const writeToDb = async (song: IQuestion & { roundNum: number }) => {
  if (song && song?.track) {
    void set(ref(db, DOC_NAME + '/' + song.track), { ...song, timestamp: Date.now() })
  }
}

export const deleteCollection = async () => {
  void set(ref(db, DOC_NAME + '/'), null)
}
