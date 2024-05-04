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
  let slideName = "fPslide"+slideIndex;
  const [brands, setBrands] = [];
  const navigate = useNavigate();

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
       
      // Map each BrandDoc to a promise that fetches its products
      // const BrandPromises = brandQuerySnapshot.docs.map(async (brandDoc) => {
      //   brandQuerySnapshot.forOne((brandDoc) => {
      //     const brandData = brandDoc.data();
      //     allBrands.push({
      //       id: brandDoc.id,
      //       name: brandData.name,
      //       src: brandData.src
      //     });
      //   });
      // });

      // Using this function instead of the previous one cause the previous
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

      

      // Wait for all productPromises to resolve
      //await Promise.all(BrandPromises);

      // Update state after all products are fetched
      
      //setBrands(allBrands);

      console.log("Lets see all the brands");
      console.log(allBrands);
      // Find a way to put the value of AllBrands in the Brands Variable so that we can reference it in our function 
      
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  // why is this not read correctly even though it is the same as what is in the function fetchBrands()? It returns as undefines as 
  // if it has no value as of yet
  // const fetchData = async () => {
  //   await fetchBrands();
  //   console.log("What about here?");
  //   setGetBrands(brands);
    
  // };
  
  // fetchData();
  // console.log(getBrands);

  // filtering products by the brand when the brand is clicked
  // function filterByProduct (){
  //   console.log("Take me to the product page please");
  //   navigate("./products");

  // }

  //console.log(brands[0]); 
  return (
    <>
    
      <h2 id="brandsHeading">Brands</h2>
        <section  className="featuredProducts">
          <i className="fa fa-chevron-left icon left" onClick={()=> {currentSlide(-1)}}></i>
          
          <section id="fPslide1">
          
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
          </section>

          <section id="fPslide2">
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
            
          </section>

          <section id="fPslide3">
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
            <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
          </section>

          <i className="fa fa-chevron-right icon right" onClick={()=> {currentSlide(1)}}></i>
        </section>
    </>
  )
}