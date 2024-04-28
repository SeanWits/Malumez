import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import Product from './product';
import { getDocs, collection, query } from "firebase/firestore";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const shopQuerySnapshot = await getDocs(collection(db, "shops"));
        let allProducts = [];
  
        // Map each shopDoc to a promise that fetches its products
        const productPromises = shopQuerySnapshot.docs.map(async (shopDoc) => {
          const productsQuerySnapshot = await getDocs(query(collection(db, 'shops', shopDoc.id, 'products')));
          productsQuerySnapshot.forEach((productDoc) => {
            const productData = productDoc.data();
            allProducts.push({
              id: productDoc.id,
              imageUrl: productData.src,
              name: productData.name,
              price: productData.price,
            });
          });
        });
  
        // Wait for all productPromises to resolve
        await Promise.all(productPromises);
  
        // Update state after all products are fetched
        setProducts(allProducts);
        console.log(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className="products-container-wrapper" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
