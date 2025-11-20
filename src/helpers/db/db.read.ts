import { IDbQuestion } from '@/types/Types'
import { onValue, ref } from 'firebase/database'
import { DOC_NAME } from '@/helpers/db/db.cons'
import { db } from '@/helpers/firebaseConfig'

const questions = ref(db, DOC_NAME)
type DbEntries = Record<string, IDbQuestion>

export const fetchDataFromDb = async (callback: (T: DbEntries) => void) => {
  onValue(questions, snapshot => {
    const data = snapshot.val()
    callback(data)
  })
}
