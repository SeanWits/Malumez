import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection, query } from "firebase/firestore";

function Sean() {
  const [val, setVal] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
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
            allProducts.push(productData.name); // Pushing only the product name
          });
        });

        // Wait for all productPromises to resolve
        await Promise.all(productPromises);

        // Update state after all products are fetched
        setProducts(allProducts);
        console.log(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="main">
      <input
        list="products"
        onChange={(e) => setVal(e.target.value)}
        placeholder="Search"
      />
      <datalist id="products">
        {products.map((op) => (
          <option>{op}</option>
        ))}
      </datalist>
    </div>
  );
}

export default Sean;
