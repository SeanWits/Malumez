import React, { useEffect, useState } from "react";
import { imgDB, db, auth } from "../firebase";
import { v4 } from "uuid";
import './uploadImg.css';
import Webcam from 'react-webcam';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs, query, where, updateDoc } from "firebase/firestore";

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
}

function StoreImageTextFirebase() {
    const [shopId, setShopId] = useState(null);
    const [img, setImg] = useState(''); //image url
    const [stock, setStock] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [file, setFile] = useState(null); // File state to hold the selected file
    const [uploading, setUploading] = useState(false); // State to track image uploading status
    const [showCamera, setShowCamera] = useState(false);
    const [HideCameraOnly, setHideCameraOnly] = useState(false);
    const [buttonText, setButtonText] = useState("Use Camera"); // State to track button text


    const [picture, setPicture] = useState('')
    const webcamRef = React.useRef(null)
     // eslint-disable-next-line 
    const capture = React.useCallback(() => {
        const pictureSrc = webcamRef.current.getScreenshot();
        setPicture(pictureSrc);
    })

    const savePicture = async () => {
        const blob = await fetch(picture).then(res => res.blob());
        setFile(blob);
        //console.log(picture);
        setHideCameraOnly(true);
    };


    const SwitchMode = () => {
        if (showCamera) {
            setShowCamera(false);
            setButtonText("Take Picture");
            setFile('');
        } else {
            setShowCamera(true);
            setButtonText("Upload Picture");
            setFile('');
            setHideCameraOnly(false);
        }
    };


    const fetchShopId = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const shopsQuerySnapshot = await getDocs(query(collection(db, "shops"), where("owner_id", "==", user.uid)));

                if (!shopsQuerySnapshot.empty) {
                    const shopDoc = shopsQuerySnapshot.docs[0];
                    const shopId = shopDoc.id;
                    setShopId(shopId);
                    console.log("Shop ID:", shopId);
                } else {
                    console.log("No shop found for the current user.");
                }
            } else {
                console.log("User is not logged in.");
            }
        } catch (error) {
            console.error('Error fetching shop ID:', error);
        }
    };

    const uploadProduct = async () => {
        try {
            // If image upload was successful, create product document
            const productData = {
                name: name,
                price: Number(price),
                stock: Number(stock),
                category: category,
                brand: brand,
                src: img, // Use the uploaded image URL
                product_id: '' // Placeholder for product ID
            };

            const productRef = collection(db, `shops/${shopId}/products`);
            console.log(productData);
            const newProductDoc = await addDoc(productRef, productData);
            // Get the generated product ID and update the product document
            await updateDoc(newProductDoc, { product_id: newProductDoc.id });
            alert("Product added successfully");

            // Reset fields after successful addition
            setName('');
            setPrice(0);
            setStock(0);
            setCategory('');
            setBrand('');
            setFile(null);
            setImg('');

        } catch (error) {
            console.error('Error adding product:', error);
            // Rollback image upload if product creation fails
            if (img) {
                const imageRef = ref(imgDB, `products/${shopId}/${v4()}`);
                await imageRef.delete(); // Delete the uploaded image
                setImg(''); // Reset image state
            }
        }
    };

    const uploadProductImg = () => {
        try {
            // Check if all fields are filled and a file is selected
            if (!name || !price || !stock || !category || !brand || !file) {
                alert("Please fill all fields and select an image file.");
                return;
            }

            if (file) {
                // Check if file is an image (png, jpeg, jpg)
                const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
                if (!allowedTypes.includes(file.type)) {
                    alert("Please select a valid image file (png, jpeg, jpg).");
                    return;
                }


                const imageRef = ref(imgDB, `products/${shopId}/${v4()}`);


                // Upload image
                setUploading(true); // Set uploading state to true
                uploadBytes(imageRef, file)
                    .then(() => {
                        // Get the download URL of the uploaded image
                        getDownloadURL(imageRef)
                            .then(imageUrl => {
                                // Set the image URL in the state
                                setImg(imageUrl);
                            })
                            .catch(error => {
                                console.error('Error getting download URL:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error uploading image:', error);
                    })
                    .finally(() => {
                        setUploading(false); // Set uploading state to false
                    });
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    // useEffect to monitor changes in img state and trigger uploadProduct
    useEffect(() => {
        if (img && !uploading) {
            uploadProduct();
     // eslint-disable-next-line 
        }
     // eslint-disable-next-line 
    }, [img, uploading]);

    useEffect(() => {
        fetchShopId();
        setShowCamera(false);
    }, []);


    return (
        <div className="scrollable-container">
            <button onClick={SwitchMode} className="btn btn-success">
                {buttonText}
            </button>
            {showCamera && !HideCameraOnly &&(
                <div>
                    {picture === '' ? (
                        <Webcam
                            audio={false}
                            height={400}
                            ref={webcamRef}
                            width={400}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                    ) : (
                         // eslint-disable-next-line 
                        <img src={picture} />
                    )}
                </div>
            )}
            <div>
                {showCamera && picture !== '' ? (
                    <>
                        <button onClick={() =>{setPicture(''); setHideCameraOnly(false); setFile('');} } className="btn btn-primary mr-2">
                            Retake
                        </button>
                        <button onClick={savePicture} className="btn btn-success">
                            Save Picture
                        </button>
                    </>
                ) : showCamera && (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            capture()
                        }}
                        className="btn btn-danger"
                    >
                        Capture
                    </button>
                )}
            </div>
            <input /><br />
            {!showCamera && (
                <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) => setFile(e.target.files[0])} />
            )}
            {file && <img src={URL.createObjectURL(file)} height='200px' width='200px' alt="Uploaded" />} {/* Show the selected image */}

            <form>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Price (R):</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div>
                    <label>Stock:</label>
                    <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>
                <div>
                    <label>Category:</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Toiletries">Toiletries</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Household">Household</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Cupboard food">Cupboard food</option>
                        <option value="Fridge food">Fridge food</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Brand:</label>
                    <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                        <option value="">Select Brand</option>
                        <option value="Clover">Clover</option>
                        <option value="Excella">Excella</option>
                        <option value="Sunlight">Sunlight</option>
                        <option value="Albany">Albany</option>
                        <option value="Coca-Cola">Coca-Cola</option>
                    </select>
                </div>
                <button type="button" onClick={uploadProductImg}>Submit</button>
            </form>
        </div>
    );

}

export default StoreImageTextFirebase;
