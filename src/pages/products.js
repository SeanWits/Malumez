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
    const [productsLoaded, setProductsLoaded] = useState(false);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    
    


    // display the products page
    ProductsPage();
    // gets the value passed from the searchBar
    const location = useLocation();
    let searchItem = location.state || [];

    

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
      //setProductsFiltered(true);
    }
    i = 0;
  
}






// check if the brands have actually been retrieved




    return (
        <>
            <div id='productPageLayout'>
                <section id='filters'>
                    <section id='insideFilters'>
                        <h2 className="productHeaders">Filters</h2>
                        <h3 className="productHeaders">Categories</h3>
                        <select className="dropdown" id="categoriesDropdown">
                            <option value="all">All</option>
                            {/* Add other options dynamically */}
                        </select>
                        {/* Other filter options */}
                        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                    </section>
                </section>

                <div className="products-container-wrapper">
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
