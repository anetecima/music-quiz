import { IQuestion } from '@/types/types.game'
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore'
import { db } from '@/helpers/firebaseConfig'

export const fetchDataFromDb = async () => {
  const querySnapshot = await getDocs(collection(db, 'questions'))
  const data = [] as IQuestion[]
  querySnapshot.forEach(question => {
    data.push({ ...(question.data() as IQuestion) })
  })

  return data
}

export const deleteCollection = async () => {
  const querySnapshot = await getDocs(collection(db, 'questions'))

  querySnapshot.forEach(question => {
    // console.log('question', question.id) /
    // data.push({ ...(question.data() as IQuestion) })
    deleteDoc(doc(db, 'questions', question.id))
  })
}
