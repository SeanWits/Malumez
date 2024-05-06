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
import { MoreOptions } from '../components/Home/More_Options';
//import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedOption,setSelectedOption]= useState(null);
    let filtered = [];
    let productsFiltered = false;
    let i=0;
    const navigate = useNavigate();

    
    


    // display the products page
    ProductsPage();
    // gets the value passed from the searchBar
    const location = useLocation();
    let searchItem = location.state || [];

    useEffect(() => {
      
        // retrieving the products in no particular order
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
          
          
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
      //setProducts();
      //products.forEach()
      

    }, []);

  

    
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

const handleOptionChange = (event) => {
  setSelectedOption(event.target.value);
};

// searching for products based on user inputs
// if(searchItem !== null)
//   {
//     products.forEach(product=>{
//       if(product.category === searchItem || product.brand === searchItem || product.name === searchItem)
//         {
          
//           console.log(product);
//             filtered[i]=product;
//             i++;
//         }
//       });
//       if(filtered.length === 0)
//         {
//           console.log("Product could not be found");

//         }

//         i=0;
     
//   }
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
   filtered=[];

  if(category !== "all" && brand!== 'all' ) // i.e there is a value for both categories and brands
    {
      
      products.forEach(product=>{
        if(product.category === category && product.brand === brand)
          {
            
            console.log(product);
              filtered[i]=product;
              i++;
          }});
      

    }
    else if(category !== "all" && brand=== 'all')// there is a category but no brand
    {
      
      products.forEach(product=>{
        if(product.category === category)
          {
            
            console.log(product);
              filtered[i]=product;
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
              filtered[i]=product;
              i++;
          }

       });

    }
    else if(category === "all" && brand=== "all")// no category and no brand
    {
      
      products.forEach(product=>{
            console.log(product);
              filtered[i]=product;
              i++;
       });
    }

    // organise products based on price - Low to high or high to low
    if(selectedOption === "highToLow")
    {
      // sorting from high to low price
      filtered.sort((a, b) => b.price - a.price);
      
    }
    else if(selectedOption === "lowToHigh")
    {
      // Sorting from low to high price
      filtered.sort((a, b) => a.price - b.price);

    }

    console.log(filtered);
    productsFiltered = true;
    i = 0;
  
}






// check if the brands have actually been retrieved



    return (
      <>
      <div id='productPageLayout'>
        <section id='filters'>
          <section id='insideFilters'>
            <h2 className = "productHeaders">Filters</h2>
          <h3 className = "productHeaders">Categories</h3>
            <select class="dropdown" id="categoriesDropdown">
            <option value="all">All</option>
            <option value="beverages">Beverages</option>
            <option value="toiletries">Toiletries</option>
            <option value="household">Household</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="cupboard foods">Cupboard Foods</option>
          </select>

          <h3 className = "productHeaders">Price</h3>
          <section id= "sortByPrice">
            <section>
            <input type="radio" value = "lowToHigh" checked={selectedOption === "lowToHigh"} onChange={handleOptionChange} id="lowToHigh" />
            <label>Low to High</label>
            </section>

            <section>
            <input type="radio" value = "highToLow" checked={selectedOption === "highToLow"} onChange={handleOptionChange} id="highToLow" />
            <label>High to Low</label>
            </section>
          </section>
          

          <h3 className = "productHeaders">Brands</h3>
            <select class="dropdown" id="brandsDropdown">
              {/* Options need to be dynamically generated depenending on the brands */}
            <option value="all">All</option>
            <option value="Sunlight">Sunlight</option>
            <option value="Koo">Koo</option>
            <option value="Johnson's">Johnson's</option>
            <option value="Simba">Simba</option>
            <option value="Kelloggs">Kelloggs</option>
          </select>


          

          <button id="apply" onClick={applyFilters}>Apply</button>
          <button className="checkout-btn" onClick={handleCheckout}> <i class="fa fa-arrow-right"></i> <i class="fa fa-shopping-basket"></i>Checkout</button>
        </section>
        </section>
        
      
        <div className="products-container-wrapper" style={{ height: '80vh', width:'200vh', overflowY: 'auto' }}>
          <div className="products-container">
            {/* the Products will only be populated once they are filtered */}
            {productsFiltered && filtered.map((product) => (
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

function ProductsPage() 
{
  return (
  <>
    <Header />
    <SearchBar />
    <Products/>
    <MoreOptions/>
    <Footer />  
  </>
  )
}

export default ProductsPage;