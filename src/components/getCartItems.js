import { db } from '../firebase';

// Function to retrieve cart items for a user
const getCartItems = async (userId) => {
  try {
    // Retrieve the cart document for the user
    const cartRef = db.collection('carts').doc(userId);
    const cartDoc = await cartRef.get();

    // Check if the cart document exists
    if (cartDoc.exists) {
      // Extract the items from the cart document
      const cartItems = cartDoc.data().items;
      console.log('Cart Items:', cartItems);
      return cartItems; // Return the cart items
    } else {
      console.log('Cart document does not exist.');
      return []; // Return an empty array if the cart document does not exist
    }
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    return []; // Return an empty array in case of error
  }
};

export default getCartItems;
