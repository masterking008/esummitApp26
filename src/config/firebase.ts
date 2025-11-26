import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyC-FCN3T6TRjNHflk9kqofca1nXY2M5Mv4",
  authDomain: "esummitapp26.firebaseapp.com",
  projectId: "esummitapp26",
  storageBucket: "esummitapp26.firebasestorage.app",
  messagingSenderId: "102675687150",
  appId: "1:102675687150:android:7d55a6a0a6dea7a02835ff"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };