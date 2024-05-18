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
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(() => {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    });
    const [selectedOption, setSelectedOption] = useState();
    const [filtered, setFiltered] = useState([]);
    const [filterClicked, setFilterClicked] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    let i = 0;

    // gets the value passed from the searchBar
    const location = useLocation();
    let searchItem = location.state || [];
    console.log("THe item is", searchItem);

    useEffect(() => {
      fetchProducts();
      console.log("The products are", products);
    }, []);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
      });
    }, []);

    function logClick()
    {
      setFilterClicked(true);
    }

    useEffect(() => {
      // This function runs when searchItem changes aka the search button gets pressed
      const handleSearchItemChange = (newValue) => {
          console.log("searchItem changed to:", newValue);
          console.log("FilterClicked is: ",filterClicked);
          if(newValue.length === 0 && filterClicked === false )
            {
              alert("Please enter something to search");
              setFiltered(products);
              console.log("The searched products are", filtered);
            }
            else{
              let someProducts = [];
              products.forEach(product=>{
                if(product.brand === newValue || product.category === newValue || product.name === newValue)
                  {
                    console.log(product);
                    someProducts[i]=product;
                    i++;
                  }});
                setFiltered(someProducts);
                console.log("The searched products based on newValue are", filtered);
              }
              if(products.length>0 && filtered.length === 0 && searchItem !== "nothing" && filterClicked === false)
                {
                  alert("There are no products of this item: ",newValue);
                  setFiltered(products);
                }
        };
        handleSearchItemChange(searchItem);
    }, [searchItem]);

    async function fetchProducts() {
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
                async function checkProducts() {
                  if (products.length === 0) {
                    // If products is not populated, put some products into it
                    let someProducts = [];
                    //checking to see if something has been searched
                    if ( searchItem.length === 0 || searchItem === "nothing") {
                      console.log("SearchItems is empty");
                      for(let i = 0;i<allProducts.length; i++)
                        {
                          someProducts[i] = allProducts[i];
                        }
                    }
                    else{
                      for(let i =0; i<allProducts.length; i++)
                      {
                        if(allProducts[i].brand === searchItem || allProducts[i].name === searchItem || allProducts[i].category === searchItem )
                          {
                            someProducts[i] = allProducts[i];
                          }
                      }
                    
                  }
                  setFiltered(someProducts);
                  setProducts(allProducts);
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

    
      const addToCart = async (product, quantity = 1) => {
        try {
            const currentUser = auth.currentUser;
    
            if (currentUser) {
                const userId = currentUser.uid;
                const userRef = doc(db, "users", userId);
    
                const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
                let updatedCart;
                if (existingItemIndex !== -1) {
                    updatedCart = [...cart];
                    updatedCart[existingItemIndex].quantity += quantity;
                } else {
                    updatedCart = [...cart, { ...product, quantity }];
                }
    
                setCart(updatedCart);
    
                await updateDoc(userRef, {
                    cart: updatedCart.map(item => ({ id: item.id, quantity: item.quantity }))
                });
            } else {
                let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
                const existingItemIndex = guestCart.findIndex(item => item.id === product.id);
    
                if (existingItemIndex !== -1) {
                    guestCart[existingItemIndex].quantity += quantity;
                } else {
                    guestCart.push({ ...product, quantity });
                }
    
                localStorage.setItem("guestCart", JSON.stringify(guestCart));
                setCart(guestCart);
            }
    
            // Show success message
            setSuccessMessage(`${product.name} added to cart`);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
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

// filtering the products by what the user selects
function applyFilters()
{
   let category = document.getElementById("categoriesDropdown").value;
   let brand = document.getElementById("brandsDropdown").value;

   // everytime the filter gets called, it must clear all the previous filter applications
   let storeProducts = []

  if(category !== "all" && brand!== 'all' ) // i.e there is a value for both categories and brands
    {
      products.forEach(product=>{
        if(product.category === category && product.brand === brand)
          {
              storeProducts[i]=product;
              i++;
          }});
    }
    else if(category !== "all" && brand=== 'all')// there is a category but no brand
    {
      
      products.forEach(product=>{
        if(product.category === category)
          {
              storeProducts[i]=product;
              i++;
          }

       });
    }
    else if(category === "all" && brand !== "all")// brand with no category
    {
      products.forEach(product=>{
        if(product.brand === brand)
          {
              storeProducts[i]=product;
              i++;
          }
       });

    }
    else if(category === "all" && brand=== "all")// no category and no brand
    {
      products.forEach(product=>{
            console.log(product);
              storeProducts[i]=product;
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
    }
    i = 0;
    setFilterClicked(false);
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
                  <button className="applyButton" onClick={() => { applyFilters(); logClick(); }}>Apply Filters</button>
                  
              </section>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </section>

          <div className="products-container-wrapper">
              <div className="products-container">
                  { filtered.map((product) => (
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
