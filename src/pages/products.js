import React, { useEffect, useState } from 'react';
import Product from '../components/product';
import { db } from '../firebase';
import { getDocs, collection, query } from "firebase/firestore";
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchBar } from '../components/Home/Search';
import './products.css';
import './home';
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";



const Products = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [fetchAll, setFetchAll] = useState([]);
    const navigate = useNavigate();

    // display the products page
    ProductsPage();
    // gets the value passed from one file to another
    const location = useLocation();
    let searchItem = location.state || [];

    useEffect(() => {
      if (searchItem == null)
        {// display all the products in no particular organisation if the person has not searched anything
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
                category: productData.category,
                brand: productData.brand,
                stock:productData.stock
              });
            });
          });

          // Wait for all productPromises to resolve
          await Promise.all(productPromises);

          // Update state after all products are fetched
          setProducts(allProducts);
          setFetchAll(allProducts);
          console.log(allProducts);
          // console.log("Lets see what is inside fetchall");
          // console.log(fetchAll);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
    }
    
    }, []);

    
    // function filter()
    // {
    //   // searches though the products and returns the ones which match the search in brand, name or category
    //   console.log(fetchAll);
    //   console.log("Now the filtered products");
    //   let searchProducts = fetchAll.filter(fetchAll => fetchAll.category.toLowerCase() === searchItem.toLowerCase());
    //   searchProducts = searchProducts + fetchAll.filter(fetchAll => fetchAll.brand.toLowerCase() === searchItem.toLowerCase());
    //   searchProducts = searchProducts + fetchAll.filter(fetchAll => fetchAll.name.toLowerCase() === searchItem.toLowerCase());
    //   console.log(searchProducts);

    // }
    

    

 const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    console.log(cart);
};

const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    console.log(cart);
};

const handleCheckout = () => {
    navigate('/checkOut',{ state: cart });
    console.log("Cart items:", cart);
};


    return (
      <>
      
        <div className="products-container-wrapper" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <div className="products-container">
            {products.map((product) => (
              <Product
                key={product.id}
                imageUrl={product.imageUrl}
                name={product.name}
                price={product.price}
                onAddToCart={() => addToCart(product)}
                onRemoveFromCart={() => removeFromCart(product.id)}
              />
            ))}
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
        </>
      );
};

function ProductsPage() 
{
  return (
  <>
    <Header />
    <SearchBar />
    <Products/>
    <Footer />  
  </>
  )
}

export default ProductsPage;