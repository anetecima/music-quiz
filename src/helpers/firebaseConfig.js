import { getDatabase } from 'firebase/database'
// import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

// const firebaseConfig = {
//   apiKey: 'AIzaSyCjYdwRgjOCoYorob6fwaFzoZP37-7rx9s',
//   authDomain: 'quizz-ae3c2.firebaseapp.com',
//   projectId: 'quizz-ae3c2',
//   storageBucket: 'quizz-ae3c2.appspot.com',
//   messagingSenderId: '628590822590',
//   appId: '1:628590822590:web:5cee25fda54e03b9f20aef'
// }

const firebaseConfig = {
  apiKey: 'AIzaSyAsm3Wvd3KSsoJtvpXc7rvgzWg_zMAYiIU',
  authDomain: 'musicquizz-cbd00.firebaseapp.com',
  databaseURL: 'https://musicquizz-cbd00-default-rtdb.firebaseio.com',
  projectId: 'musicquizz-cbd00',
  storageBucket: 'musicquizz-cbd00.firebasestorage.app',
  messagingSenderId: '325279793878',
  appId: '1:325279793878:web:3605d87ab8620b6aae7f77'
}

let origin

const initialize = () => {
  if (!origin) {
    origin = initializeApp(firebaseConfig)
  }

  return origin
}

const app = initialize()

export const db = getDatabase(app)
