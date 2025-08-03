import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import * as serviceAccount from '../keys/serviceAccountKey.json'

const firebaseApp = initializeApp({
  credential: cert(serviceAccount as any),
})

export const firebaseAuth = getAuth(firebaseApp)
