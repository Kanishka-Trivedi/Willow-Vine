// Backend/config/firebaseAdmin.js

import admin from 'firebase-admin';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Get the directory name for correct path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Define the path to your service account key file
// ⚠️ Replace 'serviceAccountKey.json' with the exact name of the file you downloaded
const serviceAccountPath = path.resolve(__dirname, '../willowandvine-b8b58-firebase-adminsdk-fbsvc-98249f0121.json');

// 3. Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
  // Optionally, set the database URL if you use Realtime Database or Storage
  // databaseURL: "https://<DATABASE_NAME>.firebaseio.com", 
});

// Export the initialized admin instance
export default admin;