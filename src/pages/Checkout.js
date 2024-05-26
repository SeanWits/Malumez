import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { setDoc, doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./Checkout.css";
import { UserContext } from '../App';
import FadeLoader from "react-spinners/FadeLoader";


const Checkout = () => {
    const user = useContext(UserContext);
    const [currentUser, setCurrentUser] = useState(null);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState(
        location.state?.cart || JSON.parse(localStorage.getItem("cart")) || []
    );
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("searchInput", "");
        setCurrentUser(user);
    }, [user]);

    useEffect(() => {
        if (currentUser) {
            fetchCart(currentUser.uid);
        }
    }, [currentUser]);

    const fetchCart = async (userId) => {
        try {
            const cartDoc = await getDoc(doc(db, "carts", userId));
            if (cartDoc.exists()) {
                setCart(cartDoc.data().items);
                console.log("Cart fetched from Database ", cart)
            } else {
                setCart([]);
            }
        } catch (error) {
            console.error("Error fetching cart: ", error);
        }
    };

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                setCurrentUser(null);
                navigate("/");
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
                setError("Error signing out. Please try again.");
            });
    };

    const handleKeepShopping = () => {
        navigate("/products", { state: { cart: cart } });
    };

    const handleRemoveFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        if (currentUser) {
            addCartForUser(currentUser.uid, updatedCart);
        }
    };

    const handleIncreaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        if (currentUser) {
            addCartForUser(currentUser.uid, updatedCart);
        }
    };

    const handleDecreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            if (currentUser) {
                addCartForUser(currentUser.uid, updatedCart);
            }
        } else {
            handleRemoveFromCart(index);
        }
    };

    const calculateTotalPrice = () => {
        return cart
            .reduce(
                (total, product) =>
                    total + parseFloat(product.price || 0) * product.quantity,
                0
            )
            .toFixed(2);
    };

    const addCartForUser = async (userId, cartItems) => {
        setLoading(true); // Show loader
        try {
            await setDoc(doc(db, "carts", userId), { items: cartItems });
            console.log("Cart added for user with ID: ", userId);
            setTimeout(() => {
                setLoading(false); // Hide loader after delay
            }, 2000);
        } catch (error) {
            console.error("Error adding cart for user: ", error);
            setTimeout(() => {
                setLoading(false); // Hide loader after delay
            }, 2000);
        }
    };

    const handleFinalizePurchase = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items to your cart before finalizing the purchase.");
            return;
        }
    
        setLoading(true); // Show loader
        console.log("Purchase finalized!");
    
        try {
            // Fetch the username from the users collection
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            let username = "";
            if (userDoc.exists()) {
                username = userDoc.data().username || "Unknown User";
            } else {
                console.log("No user document found.");
            }
    
            const total = calculateTotalPrice();
    
            // Add status field to each product in the cart and handle shop_id properly
            const updatedCart = cart.map(product => ({
                ...product,
                status: "ordered",
                shop_id: product.shopID || "unknown" // Use shopID if it exists
            }));
    
            // Extract unique shop_ids from the cart
            const shopIds = [...new Set(updatedCart.map(product => product.shop_id))];
    
            const orderData = {
                dateOrdered: serverTimestamp(),
                items: updatedCart,
                status: "ordered",
                total: total,
                userID: currentUser.uid,
                username: username,
                shops: shopIds,
            };
    
            await addDoc(collection(db, "orders"), orderData);
            console.log("Order added to the database.");
            setCart([]);
            localStorage.removeItem("cart");
            if (currentUser) {
                await setDoc(doc(db, "carts", currentUser.uid), { items: [] });
                console.log("Cart cleared in the database.");
            }
            setTimeout(() => {
                setLoading(false); // Hide loader after delay
            }, 2000);
            alert("Purchase finalized! Thank you for shopping with us!");
            navigate("/OrderStatus");
        } catch (error) {
            setTimeout(() => {
                setLoading(false); // Hide loader after delay
            }, 2000);
            console.error("Error finalizing purchase:", error);
            setError("Error finalizing purchase. Please try again.");
        }
    };
    
    return (
        <>
        <Header />
        <section className="searchBar">
            <i className="fa fa-bars icon" />
            <section id="checkoutBanner">
                <h2>Checkout</h2>
            </section>
        </section>
        {loading ? (
            <div className="sweet-loading">
                <FadeLoader
                    height={25}
                    margin={50}
                    radius={2}
                    width={5}
                    color={"#36d7b7"}
                    loading={loading}
                    speedMultiplier={1}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className="loader"
                />
            </div>
        ) : (
            <section className="checkout-container">
                <section className="cart-box">
                    <h2 className="centered-heading">Items in Cart</h2>
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul className="cart-list">
                            {cart.map((product, index) => (
                                <li key={product.id} className="cart-item">
                                    <div className="cart-item-content">
                                        <span>
                                            {product.name} - R{product.price} x{" "}
                                            {product.quantity}
                                        </span>
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() =>
                                                    handleDecreaseQuantity(
                                                        index
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleIncreaseQuantity(
                                                        index
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleRemoveFromCart(index)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                <section className="checkout-page-box">
                    <h1>Checkout</h1>
                    <div className="checkout-details">
                        <p>Total Price: R{calculateTotalPrice()}</p>
                    </div>
                    <button className="button" onClick={handleKeepShopping}>
                        Continue Shopping
                    </button>
                    <button
                        className="button sign-out-button"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                    <button
                        className="finalize-button"
                        onClick={handleFinalizePurchase}
                    >
                        Finalize Purchase
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </section>
            </section>
        )}
        <Footer />
    </>
    );
};

export default Checkout;
