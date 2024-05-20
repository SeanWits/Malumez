// ShowProducts.js
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ShowProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <div>
      {/* Your product display component */}
      <Link to={{ pathname: '/checkout'}}>Proceed to Checkout</Link>
    </div>
  );
};

export default ShowProducts;
