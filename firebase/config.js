// firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Validate Firebase configuration
const requiredEnvVars = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check for missing or placeholder values
const missingVars = Object.entries(requiredEnvVars)
    .filter(([key, value]) => !value || value.includes('your-'))
    .map(([key]) => key);

if (missingVars.length > 0) {
    console.warn(
        `🔥 Firebase Configuration Warning:
Missing or invalid environment variables: ${missingVars.join(', ')}

Please follow these steps:
1. Go to https://console.firebase.google.com/
2. Select your project (or create a new one)
3. Go to Project Settings > General
4. Scroll down to "Your apps" section
5. Click on the </> (Web) icon to add a web app or view existing config
6. Copy the config values to your .env.local file

Your .env.local file should look like:
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef`
    );
}

const firebaseConfig = {
    apiKey: requiredEnvVars.apiKey,
    authDomain: requiredEnvVars.authDomain,
    projectId: requiredEnvVars.projectId,
    storageBucket: requiredEnvVars.storageBucket,
    messagingSenderId: requiredEnvVars.messagingSenderId,
    appId: requiredEnvVars.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
