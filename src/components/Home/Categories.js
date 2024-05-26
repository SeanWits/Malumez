import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { getDocs, collection, query} from "firebase/firestore";

export function Categories()
{
  const navigate = useNavigate();
  const [homeProducts, setHomeProducts] = useState([]);

  useEffect(() => {
    fetchHomeProducts();
  },[]);

  let categoryName = "Products";
  async function fetchHomeProducts() {
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
                
            });
        });} 
    });
        
      await Promise.all(productPromises);

      // this function makes sure that homeProducts gets populated first before the images are generated 
    async function checkHomeProducts() {
      if (homeProducts.length === 0) {
        // If homeProducts is not populated, put some products into it
        let someProducts = [];
        for(let i = 0;i<7; i++)
          {
            someProducts[i] = allProducts[i];
          }
        setHomeProducts(someProducts);
      }
      // Wait until homeProducts is populated
      await new Promise(resolve => {
        const interval = setInterval(() => {
          if (homeProducts.length > 0) {
            clearInterval(interval);
            resolve();
          }
        }, 100); // Check every 100 milliseconds
      });
    }

    // Call checkHomeProducts and wait for it to complete
    await checkHomeProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    
  }

  function viewMore()
  {
    localStorage.setItem("searchInput","nothing");
    navigate('/products');
  }

  return (
    <>
      <section className="categorySection">
        <section className="categoryText">
          <h2 className="categoryHeading">
            {categoryName}
          </h2>
          <button onClick={viewMore} className="viewMoreLink"> View More</button>
        </section>

        <section id="productSection" onClick={()=>navigate("/products")}>
          {homeProducts.map((product, index)=>(
            <div id = "displayDiv" key={index} >
            <img
              className="productImage"
              src={product.imageUrl}
              alt = "product"
              />
              <section className='productLabelSection'>
              <label id = "homeProductName" htmlFor={`product${index}`}>{product.name}</label>
              <label htmlFor="productPrice"> R{product.price}</label>
              </section>
              </div>
          ))}
        </section>
      </section>
    </>
  )
  
}
