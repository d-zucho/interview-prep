// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAIuoLm5lbYp2tEKJm4UpO9hXg-vaQi22o',
  authDomain: 'prepwise-91de0.firebaseapp.com',
  projectId: 'prepwise-91de0',
  storageBucket: 'prepwise-91de0.firebasestorage.app',
  messagingSenderId: '225979762583',
  appId: '1:225979762583:web:76f482e6a77a4ee75426d2',
  measurementId: 'G-DR4EBVXS9E',
}

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)
