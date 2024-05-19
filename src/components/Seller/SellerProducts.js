import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase"; // Assuming firebase is imported correctly
import {
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import Product from "../productSeller"; // Importing the Product component
import "./SellerProducts.css";

function SellerProducts() {
    const [shopId, setShopId] = useState(null);
    const [products, setProducts] = useState([]);

    const fetchShopId = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const shopsQuerySnapshot = await getDocs(
                    query(
                        collection(db, "shops"),
                        where("owner_id", "==", user.uid)
                    )
                );

                if (!shopsQuerySnapshot.empty) {
                    const shopDoc = shopsQuerySnapshot.docs[0];
                    const shopId = shopDoc.id;
                    setShopId(shopId);
                    console.log("Shop ID:", shopId);

                    // Fetch products after setting shopId
                    fetchProducts(shopId);
                } else {
                    console.log("No shop found for the current user.");
                }
            } else {
                console.log("User is not logged in.");
            }
        } catch (error) {
            console.error("Error fetching shop ID:", error);
        }
    };

    const fetchProducts = async (shopId) => {
        try {
            const productsQuerySnapshot = await getDocs(
                collection(db, `shops/${shopId}/products`)
            );
            const productsData = productsQuerySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsData);
            console.log("Products:", productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleStockUpdate = async (productId, newStockCount) => {
        try {
            await updateDoc(doc(db, `shops/${shopId}/products`, productId), {
                stock: newStockCount,
            });
            console.log("Stock count updated successfully!");
        } catch (error) {
            console.error("Error updating stock count:", error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await deleteDoc(doc(db, `shops/${shopId}/products`, productId));
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
            console.log("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    useEffect(() => {
        fetchShopId();
    }, []); // Fetch shop ID on component mount

    return (
        <div className="container">
            <div className="productsList">
                {products.map((product) => (
                    <div key={product.id}>
                        <Product
                            imageUrl={product.src}
                            price={product.price}
                            name={product.name}
                            stockCount={product.stock}
                        />
                        <input
                            type="number"
                            value={product.stock}
                            onChange={(e) => {
                                const newStockCount = parseInt(e.target.value);
                                setProducts((prevProducts) =>
                                    prevProducts.map((prevProduct) => {
                                        if (prevProduct.id === product.id) {
                                            return {
                                                ...prevProduct,
                                                stock: newStockCount,
                                            };
                                        }
                                        return prevProduct;
                                    })
                                );
                            }}
                        />
                        <button
                            onClick={() =>
                                handleStockUpdate(product.id, product.stock)
                            }
                        >
                            Update Stock
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)}>
                            Delete Product
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SellerProducts;