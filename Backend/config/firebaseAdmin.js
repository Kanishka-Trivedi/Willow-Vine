import admin from 'firebase-admin';

const initializeFirebaseAdmin = () => {
  // Define serviceAccount INSIDE the function. 
  // This guarantees process.env is populated by dotenv.config() in server.js 
  // before we access it.
  const serviceAccount = {
    type: "service_account", 
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: "98249f01210a909118be5e608e90195efb14dbeb", 
    // The replace call is now safe
    private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: "114452589103491799880",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40willowandvine-b8b58.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK initialized successfully.');
  }
};

export default initializeFirebaseAdmin;