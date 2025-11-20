import { collection, deleteDoc, doc, getDocs, setDoc } from '@firebase/firestore'
import { db } from '@/helpers/firebaseConfig'

export const deleteCollection = async () => {
  const querySnapshot = await getDocs(collection(db, 'questions'))

  querySnapshot.forEach(question => {
    deleteDoc(doc(db, 'questions', question.id))
  })
}

export const writeScoresToDb = async (table: any) => {
  if (table) {
    await setDoc(doc(db, 'scores', 'game'), table)
  }
}
