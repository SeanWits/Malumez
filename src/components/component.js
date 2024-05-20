import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Import the Firestore database instance

const component = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from Firestore using the db instance
    const fetchData = async () => {
      try {
        const querySnapshot = await db.collection('exampleCollection').get();
        const fetchedData = querySnapshot.docs.map(doc => doc.data());
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Data from Firestore:</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default component;
