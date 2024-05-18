// Products.js

import React, { useEffect, useState } from 'react';
import Product from '../components/product';
import { db } from '../firebase';
import { getDocs, collection, query, doc, updateDoc, arrayUnion} from "firebase/firestore";
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchBar } from '../components/Home/Search';
import './products.css';
import './home';
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { MoreOptions } from '../components/Home/More_Options';
import { auth } from '../firebase';
// import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [filtered, setFiltered] = useState([]);
    const [filterClicked, setFilterClicked] = useState(false);

    // The button needs to run only when the first filtering
    const navigate = useNavigate();
    let i = 0;
    
    // gets the value passed from the searchBar or brands
    const location = useLocation();
    let searchItem = location.state || [];
    console.log("THe item is", searchItem);


    useEffect(() => {
      fetchProducts();
      console.log("The products are", products);
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
        const productPromises = shopQuerySnapshot.docs.map(async (shopDoc) => {
          const productsQuerySnapshot = await getDocs(query(collection(db, 'shops', shopDoc.id, 'products')));
          if(!productsQuerySnapshot.empty)
            {
          productsQuerySnapshot.forEach((productDoc) => {
              const productData = productDoc.data();
              allProducts.push({
                  id: productDoc.id,
                  imageUrl: productData.src,
                  name: productData.name,
                  price: productData.price,
                  category: productData.category,
                  brand:productData.brand,
                  productId: productData.product_id,
                  stock: productData.stock
                  
              });
          });} 
      });
          
        await Promise.all(productPromises);
        // this function makes sure that products gets populated first before the products are generated 
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


 const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    console.log(cart);
  
    // Get the current user
    const currentUser = auth.currentUser;
  
    // Check if a user is logged in
    if (currentUser) {
        // Get the UID of the current user
        const userId = currentUser.uid;
  
        // Retrieve the user document from Firestore
        const userRef = doc(db, "users", userId);
  
        // Update the user document by adding the product ID to the cart array
        updateDoc(userRef, {
            cart: arrayUnion(product.id)
        })
        .then(() => {
            console.log("Product added to cart successfully!");
        })
        .catch((error) => {
            console.error("Error adding product to cart: ", error);
        });
    } else {
        console.log("No user is logged in.");
    }
};


    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

const handleCheckout = () => {
    navigate('/checkOut',{ state: cart });
    console.log("Cart items:", cart);
};

const handleOptionChange = (event) => {
  setSelectedOption(event.target.value);
};

// filtering the products by what the user selects
function applyFilters()
{
   let category = document.getElementById("categoriesDropdown").value;
   let brand = document.getElementById("brandsDropdown").value;
   
   console.log(category);
   console.log(brand);
   console.log(selectedOption);

   // everytime the filter gets called, it must clear all the previous filter applications
  let storeProducts = [];

  console.log(products);
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

    // organise products based on price - Low to high or high to low
    if(selectedOption === "highToLow")
    {
      // sorting from high to low price
      storeProducts.sort((a, b) => b.price - a.price);
      
    }
    else if(selectedOption === "lowToHigh")
    {
      // Sorting from low to high price
      storeProducts.sort((a, b) => a.price - b.price);

    }
    
    // confirming that the products have been filtered
    if (storeProducts.length > 0) {
      setFiltered(storeProducts);
      //setProductsFiltered(true);
    }
    i = 0;
    console.log(filtered);
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
