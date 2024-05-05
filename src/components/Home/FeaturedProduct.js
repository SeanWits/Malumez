// import { Router, useNavigate } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { getDocs, collection, query } from "firebase/firestore";
import React, { useEffect, useState } from 'react';

export function FeaturedProducts()
{
  let brandImage=require("../../assets/Malume'zLogoFull.png");
  let slideIndex = 1;
  let totalSlides = 3;
  //const [brandArray, setBrandArray] =useState([]);
  let slideName = "fPslide"+slideIndex;
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  let i = 0;
  let brandArray = [];
  let elementRetrieved = false;

  useEffect(() => {
    // Call startingUp function once all images are loaded
    startingUp();
    fetchBrands();
    
  }, []); 


  function startingUp()
  {
    document.getElementById("fPslide1").style.display = 'block';
    document.getElementById("fPslide2").style.display = 'none';
    document.getElementById("fPslide3").style.display = 'none';
  }
  

  function currentSlide(n)
  {
      // the current slide gets invisible
      slideIndex = slideIndex+n;
      let i;
      
      if(slideIndex>3)
      {
        slideIndex =1;
      }

      if(slideIndex<1)
      {
        slideIndex =totalSlides;
      }
      
      // getting the name of the current slide
      slideName = "fPslide"+slideIndex;
      let noneSlideName = null;
      let currentSlide = document.getElementById(`${slideName}`);
      currentSlide.style.display = 'block';

      for (i = 1; i <= totalSlides; i++) {
        if(i !== slideIndex )
        {
            noneSlideName = "fPslide"+i;
            document.getElementById(`${noneSlideName}`).style.display = 'none';
        }
      }
      
  }

  //fetching brands from the database
  

  const fetchBrands = async () => {
    try {
      const brandQuerySnapshot = await getDocs(collection(db, "brands"));
      let allBrands = [];
      // checking to see if the snapshot is already populated or not 
      if (!brandQuerySnapshot.empty) {
        // Access all the information in the document snapshot

        // look through each element and pass it to the allBrands
        for(let i =0;i<brandQuerySnapshot.size;i++)
          {
            const firstBrandDoc = brandQuerySnapshot.docs[i];
            const brandData = firstBrandDoc.data();
    
        // Push the data to the allBrands array
            allBrands.push({
                id: firstBrandDoc.id,
                name: brandData.name,
                src: brandData.src
            });
          }
        // Access the data of the first document snapshot
        
    }
      //Getting an array with all the brands in it
      setBrands(allBrands);
      //console.log(allBrands);
      //console.log(brands);
      
      // Find a way to put the value of AllBrands in the Brands Variable so that we can reference it in our function 
      
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  // get a more accessible array containing all the brands
  brands.forEach(brand =>{

    brandArray[i]= brand;
    console.log("Another one in brandArray");
    console.log(brand)
    i++;
  });

  // check if the brands have actually been retrieved
  if(brandArray.length>1)
    {
      elementRetrieved = true;
    }
 
  
   
  // fetchData();
 

 
  return (
    <>
    
      <h2 id="brandsHeading">Brands</h2>
        <section  className="featuredProducts">


          <i className="fa fa-chevron-left icon left" onClick={()=> {currentSlide(-1)}}></i>
          
      {/* Conditionally render the image based on the state */}
      
    
          
          <section id="fPslide1" >
            {/* Only render the images once the brands have fully loaded  */}
            {elementRetrieved && <img className="brandImage" id = {brandArray[0].name} src={brandArray[0].src} alt="Image of a featured product" />}
            {elementRetrieved && <img className="brandImage" id = {brandArray[1].name} src={brandArray[1].src} alt="Image of a featured product" />}
            {elementRetrieved && <img className="brandImage" id = {brandArray[2].name} src={brandArray[2].src} alt="Image of a featured product" />}
            {elementRetrieved && <img className="brandImage" id = {brandArray[3].name} src={brandArray[3].src} alt="Image of a featured product" />}
          </section>

          <section id="fPslide2">
            {elementRetrieved && <img className="brandImage" id = {brandArray[4].name} src={brandArray[0].src} alt="Image of a featured product" />}
            {elementRetrieved && <img className="brandImage" id = {brandArray[5].name} src={brandArray[1].src} alt="Image of a featured product" />}
            {elementRetrieved && <img className="brandImage" id = {brandArray[6].name} src={brandArray[2].src} alt="Image of a featured product" />}
            {elementRetrieved && <img className="brandImage" id = {brandArray[7].name} src={brandArray[3].src} alt="Image of a featured product" />}
            
          </section>

          <section id="fPslide3">
            {elementRetrieved && <img className="brandImage" id = {brandArray[8].name} src={brandArray[0].src} alt="Image of a featured product" />}
            {elementRetrieved && <img className="brandImage" id = {brandArray[9].name} src={brandArray[1].src} alt="Image of a featured product" />}
            {elementRetrieved && <img className="brandImage" id = {brandArray[10].name} src={brandArray[2].src} alt="Image of a featured product" />}
            {elementRetrieved && <img className="brandImage" id = {brandArray[11].name} src={brandArray[3].src} alt="Image of a featured product" />}
          </section>

          <i className="fa fa-chevron-right icon right" onClick={()=> {currentSlide(1)}}></i>
        </section>
    </>
  )
}