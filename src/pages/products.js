import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../firebase';
import { getDocs, collection, query, doc, setDoc } from 'firebase/firestore';
import Product from '../components/product';
import { SearchBar } from '../components/Home/Search';
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { MoreOptions } from "../components/Home/More_Options";
import './products.css';

const Products = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [selectedOption, setSelectedOption] = useState();
  const [filtered, setFiltered] = useState([]);
  const [productFiltered, setProductsFiltered] = useState(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  let i = 0;

  const location = useLocation();
  let searchItem = location.state || [];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const shopQuerySnapshot = await getDocs(collection(db, "shops"));
        let allProducts = [];

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
              stock: productData.stock
            });
          });
        });

        await Promise.all(productPromises);

        console.log('Fetched products:', allProducts);
        setProducts(allProducts);
        setFiltered(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const updateCart = async (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    if (currentUser) {
      try {
        await setDoc(doc(db, "users", currentUser.uid), {
          cart: updatedCart.map(item => ({ id: item.id, quantity: item.quantity }))
        }, { merge: true });
      } catch (error) {
        console.error("Error updating cart in Firestore: ", error);
      }
    }
  };
  const addCartForUser = async (userId, cartItems) => {
    try {
      await setDoc(doc(db, "carts", userId), { items: cartItems });
      console.log("Cart added for user with ID: ", userId);
    } catch (error) {
      console.error("Error adding cart for user: ", error);
    }
  };  
  
  const addToCart = async (product, quantity = 1) => {
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { ...product, quantity: quantity > 0 ? quantity : 1 }];
    }
    await updateCart(updatedCart);
    if (currentUser) {
      addCartForUser(currentUser.uid, updatedCart);
    }
    setSuccessMessage(`${product.name} added to cart`);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
  
  const removeFromCart = (productId) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    updateCart(updatedCart);
    if (currentUser) {
      addCartForUser(currentUser.uid, updatedCart);
    }
  };
  


  const handleCheckout = () => {
    if (currentUser) {
      navigate("/checkout", { state: { cart: cart } });
    } else {
      alert("Please log in to proceed to checkout.");
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  function applyFilters() {
    let category = document.getElementById("categoriesDropdown").value;
    let brand = document.getElementById("brandsDropdown").value;
    console.log(category);
    console.log(brand);
    console.log(selectedOption);

    let storeProducts = [];

    if (category !== "all" && brand !== 'all') {
      products.forEach(product => {
        if (product.category === category && product.brand === brand) {
          storeProducts[i] = product;
          i++;
        }
      });
    } else if (category !== "all" && brand === 'all') {
      products.forEach(product => {
        if (product.category === category) {
          storeProducts[i] = product;
          i++;
        }
      });
    } else if (category === "all" && brand !== "all") {
      products.forEach(product => {
        if (product.brand === brand) {
          storeProducts[i] = product;
          i++;
        }
      });
    } else if (category === "all" && brand === "all") {
      products.forEach(product => {
        storeProducts[i] = product;
        i++;
      });
    }

    if (selectedOption === "highToLow") {
      storeProducts.sort((a, b) => b.price - a.price);
    } else if (selectedOption === "lowToHigh") {
      storeProducts.sort((a, b) => a.price - b.price);
    }

    if (storeProducts.length > 0) {
      setFiltered(storeProducts);
      setProductsFiltered(true);
    }
    i = 0;
  }

  return (
    <>
      <div id='productPageLayout'>
        <section id='filters'>
          <section id='insideFilters'>
            <h2 className="productHeaders">Filters</h2>
            <h3 className="productHeaders">Categories</h3>
            <select className="dropdown" id="categoriesDropdown">
              <option value="all">All</option>
              <option value="beverages">Beverages</option>
              <option value="toiletries">Toiletries</option>
              <option value="snacks">Snacks</option>
              <option value="household">Household</option>
              <option value="dairy">Dairy</option>
              <option value="bakery">Bakery</option>
              <option value="cupboard food">Cupboard Food</option>
            </select>

            <h3 className="productHeaders">Brand</h3>
            <select className="dropdown" id="brandsDropdown">
              <option value="all">All</option>
              <option value="Johnson's">Johnson's</option>
              <option value="Simba">Simba</option>
              <option value="Kelloggs">Kelloggs</option>
              <option value="Koo">Koo</option>
              <option value="Sunlight">Sunlight</option>
            </select>

            <h3 className="productHeaders">Price</h3>
            <section className='radioButtons'>
              <input type="radio" value="lowToHigh" id='lowToHigh' checked={selectedOption === "lowToHigh"} onChange={handleOptionChange} />
              <label>Low to High</label>

              <input type="radio" value="highToLow" id='highToLow' checked={selectedOption === "highToLow"} onChange={handleOptionChange} />
              <label>High to Low</label>
            </section>
            <button className="applyButton" onClick={applyFilters}>Apply Filters</button>
          </section>
          <button className="checkout-btn" onClick={handleCheckout} disabled={!currentUser}>Checkout</button>
        </section>

        <div className="products-container-wrapper">
          <div className="products-container">
            {filtered.map((product) => {
              const cartItem = cart.find(item => item.id === product.id);
              return (
                <Product
                  key={product.id}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  quantity={cartItem ? cartItem.quantity : 0}
                  onIncreaseQuantity={() => addToCart(product)}
                  onDecreaseQuantity={() => removeFromCart(product.id)}
                />
              );
            })}
          </div>
          {showMessage && (
            <div className={`success-message ${showMessage ? 'show' : ''}`}>
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

function ProductsPage() {
  return (
    <>
      <Header />
      <SearchBar />
      <Products />
      <MoreOptions />
      <Footer />
    </>
  );
}

export default ProductsPage;
