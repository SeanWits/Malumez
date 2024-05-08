import { auth, db, getDoc, doc } from "../firebase.js";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [notifyS, setNotfiyS] = useState("");
    const [notifyF, setNotfiyF] = useState("");
    const notify_success = () =>
        toast.success("Login Successful!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
        });

    // const notify_error = () => toast.error('Missng or Invalid Credentials', {
    //     position: "bottom-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "colored",
    //     transition: Flip,
    // });

    // useEffect(() => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 2000)
    // })

    // Function to handle login
    const login = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); // Activate loading state on login attempt
        try {
            // Sign in user with email and password using firebase
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log("User logged in successfully");
            setNotfiyS(true);
            // Fetch user document from Firestore
            const userDocRef = doc(db, "users", userCredential.user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            const userData = userDocSnapshot.data();

            // Check if the user has admin privileges
            if (userData && userData.roles && userData.roles.admin) {
                // Navigate to the admin page
                navigate("/");
            } else {
                // Navigate to the home page
                navigate("/");
            }
        } catch (error) {
            setError("Invalid or Missing Credentials");
            console.error("Error logging in: ", error);
            setNotfiyF(true);
        }
        // Clear email and password fields after login attempt
        setEmail("");
        setPassword("");
        //setLoading(false); // Set loading state to false after login attempt
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (notifyS) {
            notify_success();
            // Set loading to false after 2000ms
            const timeoutId = setTimeout(() => {
                setLoading(false);
                setNotfiyS(false);
            }, 2000);

            // Clear the timeout if login is successful or if there's an error
            return () => clearTimeout(timeoutId);
        }
    }, [notifyS]);

    useEffect(() => {
        if (notifyF) {
            //notify_error();
            // Set loading to false after 2000ms
            const timeoutId = setTimeout(() => {
                setLoading(false);
                setNotfiyF(false);
            }, 2000);

            // Clear the timeout if login is successful or if there's an error
            return () => clearTimeout(timeoutId);
        }
    }, [notifyF]);

    const addBodyClass = (className) => document.body.classList.add(className);
    addBodyClass("bodyHidden");
    return (
        <>
            <body>
                <div className="background">
                    <div id="solid-block-1"></div>
                    <div id="solid-block-2"></div>
                    <div id="solid-block-3"></div>
                    <section className="login-forum">
                        <h1>Welcome to</h1>
                        <img
                            className="logo"
                            src={require("../assets/Malume'zLogoFullTransparent.png")}
                            alt="Malume'z Logo"
                            height="150"
                            width="400"
                        />
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
                                    className="loader" // Add a class for styling
                                />
                            </div>
                        ) : (
                            <form
                                className="formLogin"
                                onSubmit={login}
                                id="userForm"
                            >
                                <label
                                    className="labelLogin"
                                    id="emailLabel"
                                    htmlFor="email"
                                >
                                    Email Adress
                                </label>
                                <br />
                                <input
                                    className="inputText"
                                    type="text"
                                    id="emailInput"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Type your email adress"
                                    required
                                />
                                <br />
                                <label
                                    className="labelLogin"
                                    id="passwordLabel"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <br />
                                <input
                                    className="inputPassword"
                                    type="password"
                                    id="passwordInput"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Type your password"
                                    required
                                />
                                <br />
                                <br />
                                <button type="submit" id="loginBtn">
                                    Login
                                </button>
                            </form>
                        )}
                        <h2 className="head2">Don't have an account?</h2>
                        <button id="signUp" onClick={() => navigate("/SignUp")}>
                            {" "}
                            Sign Up
                        </button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </section>
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        transition={Flip}
                    />
                    {/* Same as */}
                    <ToastContainer />
                    <ToastContainer
                        position="bottom-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        transition={Flip}
                    />
                </div>
            </body>
        </>
    );
}

export default Login;
