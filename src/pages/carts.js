// Some other file
import { db } from '../firebase'; // Import the Firestore database instance

// Now you can use the `db` instance to interact with Firestore
db.collection('users').doc('userId').get()
  .then((doc) => {
    if (doc.exists()) {
      console.log('Document data:', doc.data());
    } else {
      console.log('No such document!');
    }
  })
  .catch((error) => {
    console.error('Error getting document:', error);
  });
