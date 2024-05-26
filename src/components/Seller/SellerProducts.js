import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Assuming firebase is imported correctly
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
import { jsPDF } from "jspdf"; // Importing jsPDF
import "./SellerProducts.css";

function SellerProducts({ user }) {
    const [shopId, setShopId] = useState(null);
    const [products, setProducts] = useState([]);

    const fetchShopId = async () => {
        try {
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

    const downloadPDF = () => {
        const doc = new jsPDF();
        let yOffset = 10;

        doc.text("Stock on Hand", 10, yOffset);
        yOffset += 10;

        products.forEach((product, index) => {
            doc.text(`Name: ${product.name}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Stock: ${product.stock}`, 10, yOffset);
            yOffset += 10;
            doc.text(`Price: R${product.price}`, 10, yOffset);
            yOffset += 10;

            if (index < products.length - 1) {
                yOffset += 10; // Add extra space between products
            }
        });

        doc.save("stock_on_hand.pdf");
    };

    useEffect(() => {
        fetchShopId();
    }, [user]); // Fetch shop ID on component mount

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
            <button onClick={downloadPDF} className="download-btn">
                Download Stock on Hand
            </button>
        </div>
    );
}

export default SellerProducts;
