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
  const [successMessage, setSuccessMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  let i = 0;

    useEffect(() => {
        // Load products on component mount
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
          console.log("The products are:");
          console.log(products);    
          
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();  
      searchProducts(); 

    }, []);

  

    
  
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

// the search function that works like filter and returns the products based on what the person searches 
// function searchProducts()
// {
//   let j = 0;
//   let storeProducts = [];
//   if(searchItem !== null)
//     {
//       if(filtered.length !== 0)
//         {
//             let searchArray = [];
//             products.forEach(product=>{
//               if(product.category === searchItem || product.brand === searchItem|| product.name === searchItem)
//                 {
                  
//                   console.log(product);
//                     searchArray[j]=product;
//                     i++;
//                 }});
//               setFiltered(searchArray);

            
//         }
//         console.log("The following items were found");
//         console.log(filtered);
//   }
//   else{
//     console.log("Enter something to be searched");
//   }
//   j=0;

// }

const searchProducts = () => {
  if (searchItem && searchItem.length > 0) {
      const searchResults = products.filter(product => (
          product.category === searchItem ||
          product.brand === searchItem ||
          product.name === searchItem
      ));
      setFiltered(searchResults);
      setProductsFiltered(true);
  } else {
      setFiltered([]);
      setProductsFiltered(false);
  }
};




// filtering the products by what the user selects
function applyFilters()
{
   let category = document.getElementById("categoriesDropdown").value;
   let brand = document.getElementById("brandsDropdown").value;
   console.log(searchItem);
   console.log(category);
   console.log(brand);
   console.log(selectedOption);

   // everytime the filter gets called, it must clear all the previous filter applications
   let storeProducts = []

  if(category !== "all" && brand!== 'all' ) // i.e there is a value for both categories and brands
    {
      
      products.forEach(product=>{
        if(product.category === category && product.brand === brand)
          {
            
            console.log(product);
              storeProducts[i]=product;
              i++;
          }});
      
    }
    else if(category !== "all" && brand=== 'all')// there is a category but no brand
    {
      
      products.forEach(product=>{
        if(product.category === category)
          {
            
            console.log(product);
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
            
            console.log(product);
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
            {successMessage && <div className="success-message">{successMessage}</div>}
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
