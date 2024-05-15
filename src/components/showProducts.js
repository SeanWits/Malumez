// ShowProducts.js
import { Link } from 'react-router-dom';

const ShowProducts = () => {
  // const [selectedProducts, setSelectedProducts] = useState([]);

  // Function to add a product to the selected products list
  // const addToSelectedProducts = (product) => {
  //   setSelectedProducts([...selectedProducts, product]);
  // };

  // Function to remove a product from the selected products list
  // const removeFromSelectedProducts = (productId) => {
  //   setSelectedProducts(selectedProducts.filter(product => product.id !== productId));
  // };

  return (
    <div>
      {/* Your product display component */}
      <Link to={{ pathname: '/checkout'}}>Proceed to Checkout</Link>
    </div>
  );
};

export default ShowProducts;
