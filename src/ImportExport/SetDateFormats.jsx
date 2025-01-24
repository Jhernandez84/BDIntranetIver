import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';

// Initialize Firebase with your Firebase config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to transform Excel-like date to 'yyyy-MM-dd' format
function excelDateToFormattedDate(excelDateNumber) {
  // Convert Excel date to JavaScript date
  const date = new Date((excelDateNumber - 1) * 24 * 60 * 60 * 1000 + 2209161600000);
  
  // Format the JavaScript date as 'yyyy-MM-dd'
  return format(date, 'yyyy-MM-dd');
}

// Function to update data in Firestore
async function updateFirestoreData() {
  try {
    // Fetch data from Firestore
    const collectionRef = collection(db, 'yourCollectionName'); // Replace with your collection name
    const querySnapshot = await getDocs(collectionRef);

    // Iterate through the documents and update them
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Check if the document has an 'excelDate' field
      if (data.hasOwnProperty('excelDate')) {
        // Convert 'excelDate' to 'yyyy-MM-dd' format
        const formattedDate = excelDateToFormattedDate(data.excelDate);

        // Update the document with the formatted date
        const docRef = doc(collectionRef, doc.id);
        updateDoc(docRef, { formattedDate });
      }
    });

    console.log('Data updated successfully.');
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

// Call the function to update Firestore data
updateFirestoreData();
