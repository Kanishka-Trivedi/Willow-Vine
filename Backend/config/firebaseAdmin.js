import admin from 'firebase-admin';

const serviceAccount = {
  type: process.env.FIREBASE_TYPE, // 'service_account' - typically hardcoded or added
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID, // If you add this to .env
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'), // Important: Replace escaped newlines with actual newlines
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID, // If you add this to .env
  auth_uri: process.env.FIREBASE_AUTH_URI, // If you add this to .env
  token_uri: process.env.FIREBASE_TOKEN_URI, // If you add this to .env
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL, // If you add this to .env
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL, // If you add this to .env
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN // If you add this to .env
};

const initializeFirebaseAdmin = () => {
  // Check if Firebase app is already initialized to avoid errors in development/watch mode
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  }
};

export default initializeFirebaseAdmin;