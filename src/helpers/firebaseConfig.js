import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCjYdwRgjOCoYorob6fwaFzoZP37-7rx9s',
  authDomain: 'quizz-ae3c2.firebaseapp.com',
  projectId: 'quizz-ae3c2',
  storageBucket: 'quizz-ae3c2.appspot.com',
  messagingSenderId: '628590822590',
  appId: '1:628590822590:web:5cee25fda54e03b9f20aef'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
