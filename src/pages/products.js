import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { getDocs, collection, query, doc, setDoc } from 'firebase/firestore';
import Product from '../components/product';
import { SearchBar } from '../components/Home/Search';
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import FadeLoader from "react-spinners/FadeLoader";
import { MoreOptions } from "../components/Home/More_Options";
import './products.css';
import { UserContext } from '../App';

const Products = ({ user }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    });
    const [selectedOption, setSelectedOption] = useState();
    const [filtered, setFiltered] = useState([]);
    const[filteredPopulated, setFilteredPopulated] = useState(false);
    const [filterClicked, setFilterClicked] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    let i = 0;

    // this stores the value of the cart in case the user decides to continue shopping on the cart page
    const location = useLocation();
    // eslint-disable-next-line
    let cartState= location.state || [];

    // getting the searched item from the search Bar
    let searchReceived = localStorage.getItem("searchInput");
    
    // calls the function to display the products
    useEffect(() => {
      fetchProducts();
      setCurrentUser(user);
      console.log(user);
      // eslint-disable-next-line
    }
    // eslint-disable-next-line
    , []);

    
    useEffect(() => {
      // only run this function if there are actual products in the products variable
      if(filteredPopulated)
      {
      // This function runs when searchReceived changes aka the search button gets pressed
      const handleSearchReceivedChange = (newValue) => {
         let someProducts = [];

          if(filterClicked === false)// this only runs if the filter hasn't been clicked
            {
              if(searchReceived === "nothing")// if there is nothing in the search, display all products
              {
                products.forEach(product => {
                  someProducts[i] = product;
                  i++;
                });
              }
              else{// the searchReceived is populated
                products.forEach(product => {
                  if(product.brand === newValue || product.category === newValue || product.name === newValue)
                    {
                      someProducts[i] = product;
                      i++;
                    }
                });

              }
              if(someProducts.length === 0)// there are no products that match the search
                {
                  alert("There are no Products that match your search: ", newValue);
                  products.forEach(product => {
                    someProducts[i] = product;
                    i++;
                  });
                }
              setFiltered(someProducts);
            }
        };
        handleSearchReceivedChange(searchReceived);

      }
      // eslint-disable-next-line
    }
    // eslint-disable-next-line
    , [searchReceived]);

    // fetching the products from the database 
    async function fetchProducts() {
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
              stock: productData.stock, 
              shopID: productData.shop_id
            });
          });
        });

        await Promise.all(productPromises);
                // checks that the products variable has been populated and calls it until it is
                async function checkProducts() {
                  if (products.length === 0) {
                    // If products is not populated, put some products into it
                    let someProducts = [];
                    //checking to see if something has been searched
                    if ( searchReceived.length === 0 || searchReceived ==="nothing" ) {
                      console.log("Received is empty");
                      for(let i = 0;i<allProducts.length; i++)
                        {
                          someProducts[i] = allProducts[i];
                        }
                    }
                    else{
                      // searches through based on the item the user has looked for on the home page
                      // also searches based on which brand is clicked on the home page
                      for(let i =0; i<allProducts.length; i++)
                      {
                        if(allProducts[i].brand === searchReceived || allProducts[i].name === searchReceived|| allProducts[i].category === searchReceived )
                          {
                            someProducts[i] = allProducts[i];
                          }
                      }
                      if(someProducts.length ===0)
                        {
                          alert("The product could not be found: ", searchReceived);
                          someProducts = allProducts;
                        }
                  }
                  setFiltered(someProducts);
                  setProducts(allProducts);
                  setFilteredPopulated(true);
                }
              // Wait until Products is populated
              await new Promise(resolve => {
                const interval = setInterval(() => {
                  if (products.length > 0 && filtered.length>0) {
                    clearInterval(interval);
                    resolve();
                  }
                }, 100); // Check every 100 milliseconds
              });
              }

              // Call checkProducts and wait for it to complete
              await checkProducts();
              } catch (error) {
                console.error('Error fetching products:', error);
              }

          }

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
    setloading(true); // Show loader
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
    setTimeout(() => {
      setloading(false); // Hide loader after delay
    }, 2000);
  };
  
  const removeFromCart = async (productId) => {
    setloading(true); // Show loader
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
  
    await updateCart(updatedCart);
    if (currentUser) {
      await addCartForUser(currentUser.uid, updatedCart);
    }
  
    setTimeout(() => {
      setloading(false); // Hide loader after delay
    }, 2000);
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

    // sorting the items by price depending on the user's choice
    if (selectedOption === "highToLow") {
      storeProducts.sort((a, b) => b.price - a.price);
    } else if (selectedOption === "lowToHigh") {
      storeProducts.sort((a, b) => a.price - b.price);
    }

    // populating the filtered products to be displayed on screen 
    if (storeProducts.length > 0) {
      setFiltered(storeProducts);
    }
    i = 0;
    setFilterClicked(false);
  }

  return (
    <>
      <section id='productPageLayout'>
        <section id='filters'>
          <section id='insideFilters'>
            {/* the various filters a user can apply */}
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
              <input type="radio" value="lowToHigh" name="sortOrder" id='lowToHigh' checked={selectedOption === "lowToHigh"} onChange={handleOptionChange} />
              <label>Low to High</label>
  
              <input type="radio" name="sortOrder" value="highToLow" id='highToLow' checked={selectedOption === "highToLow"} onChange={handleOptionChange} />
              <label>High to Low</label>
            </section>
            <button className="applyButton" onClick={applyFilters}>Apply Filters</button>
          </section>
          <button className="checkout-btn" onClick={handleCheckout} disabled={!currentUser}>Checkout</button>
        </section>
  
        {/* the products are created dynamically depending on how many there are */}
        <section className="products-container-wrapper">
          {loading ? (
            <div className="sweet-loading">
              <FadeLoader
                height={25}
                margin={50}
                radius={2}
                width={5}
                color={"#36d7b7"}
                loading={loading}
                speedMultiplier={1}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="loader"
              />
            </div>
          ) : (
              <section className="products-container">
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
              </section>
            )}
          {showMessage && (
            <div className={`success-message ${showMessage ? 'show' : ''}`}>
              {successMessage}
            </div>
          )}
        </section>
      </section>
    </>
  );  
};

// Displaying the product page and all its components
function ProductsPage() {
  const user = useContext(UserContext);
  return (
    <>
      <Header/>
      <SearchBar />
      <Products user={user}/>
      <MoreOptions/>
      <Footer />
    </>
  );
}

export default ProductsPage;
