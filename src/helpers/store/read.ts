import { IDbQuestion } from '@/types/Types'
import { collection, getDocs } from '@firebase/firestore'

// import { db } from '@/helpers/firebaseConfig'

export const fetchDataFromDb = async (): Promise<IDbQuestion[]> => {
  const querySnapshot = await getDocs(collection(db, 'questions'))
  const data: IDbQuestion[] = []

  querySnapshot.forEach(question => {
    data.push(question.data() as IDbQuestion)
  })

  return data
}
