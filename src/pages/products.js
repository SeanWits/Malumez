import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../firebase';
import { getDocs, collection, query, doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import Product from '../components/product'; // Import the Product component
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
  const location = useLocation();
  let i = 0;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  
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
        
        console.log('Fetched products:', allProducts); // Log fetched products
        setProducts(allProducts);
        setFiltered(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);
  
  const addToCart = async (product) => {
    try {
        // Get the current user
        const currentUser = auth.currentUser;

        if (currentUser) {
            // If a user is logged in, update the cart in the database
            const userId = currentUser.uid;
            const userRef = doc(db, "users", userId);

            // Add the product ID to the cart array in the database
            await updateDoc(userRef, {
                cart: arrayUnion(product.id)
            });

            console.log("Product added to cart successfully!");

            // Update the cart state after the database operation is completed
            const updatedCart = [...cart, product];
            setCart(updatedCart);
        } else {
            // If no user is logged in, add the product to the guest cart in local storage
            let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
            guestCart.push(product);
            localStorage.setItem("guestCart", JSON.stringify(guestCart));

            console.log("Product added to guest cart successfully!");

            // Update the cart state after the local storage operation is completed
            const updatedCart = [...cart, product];
            setCart(updatedCart);
        }
    } catch (error) {
        console.error("Error adding product to cart: ", error);
    }
};


const handleCheckout = () => {
  navigate("/checkout", { state: { cart: cart } });
};

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
                        <input type="radio" value = "lowToHigh" id='lowToHigh' checked={selectedOption === "lowToHigh"} onChange={handleOptionChange}/>
                        <label >Low to High</label>

                        <input type="radio" value = "lowToHigh" id='lowToHigh' checked={selectedOption === "highToLow"} onChange={handleOptionChange}/>
                        <label >High to Low</label>
                    </section>
                    <button className="applyButton" onClick={applyFilters}>Apply Filters</button>
                </section>
                <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
            </section>

            <div className="products-container-wrapper">
            <div className="products-container">
    {filtered.map((product) => (
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
