import { IDbQuestion } from '@/types/Types'
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore'
import { db } from '@/helpers/firebaseConfig'

export const fetchDataFromDb = async (): Promise<IDbQuestion[]> => {
  const querySnapshot = await getDocs(collection(db, 'questions'))
  const data: IDbQuestion[] = []

  querySnapshot.forEach(question => {
    data.push(question.data() as IDbQuestion)
  })

  return data
}

export const deleteCollection = async () => {
  const querySnapshot = await getDocs(collection(db, 'questions'))

  querySnapshot.forEach(question => {
    deleteDoc(doc(db, 'questions', question.id))
  })
}
