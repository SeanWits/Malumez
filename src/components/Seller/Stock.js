import { useEffect, useState } from "react";
import Product from "../../components/Seller/product";
import { db } from "../../firebase";
import { getDocs, collection, query } from "firebase/firestore";
import "../../pages/products.css";
import "../../pages/home";


export function Stock() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    // retrieving the products in no particular order
    const fetchProducts = async () => {
      try {
        const shopQuerySnapshot = await getDocs(collection(db, "shops"));
        let allProducts = [];

        // Map each shopDoc to a promise that fetches its products
        const productPromises = shopQuerySnapshot.docs.map(async (shopDoc) => {
          const productsQuerySnapshot = await getDocs(
            query(collection(db, "shops", shopDoc.id, "products"))
          );
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
            });
          });
        });

        // Wait for all productPromises to resolve
        await Promise.all(productPromises);

        // Update state after all products are fetched
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    console.log(cart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    console.log(cart);
  };


  return (
    <>
      <div id="productPageLayout">
        <div className="sellerPage products-container-wrapper">
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
}
