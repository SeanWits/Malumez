import { Router, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export function AdsBar()
{
  let slideIndex = 1;
  let totalSlides = 3;
  let slideName = "slide"+slideIndex;

  useEffect(() => {
    // Call startingUp function once all images are loaded
    startingUp();
  }, []); 

  function startingUp()
  {
    document.getElementById("slide1").style.display = 'block';
    document.getElementById("slide2").style.display = 'none';
    document.getElementById("slide3").style.display = 'none';
  }
  

  function currentSlide(n)
  {
      // the current slide gets invisible
      let prevSlide = document.getElementById(`${slideName}`);
      console.log("Previous slide:" + slideName);
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
      slideName = "slide"+slideIndex;
      let noneSlideName = null;
      let currentSlide = document.getElementById(`${slideName}`);
      console.log("CurrentSlide = "+ slideName);
      currentSlide.style.display = 'block';

      console.log("Starting for loop");
      for (i = 1; i <= totalSlides; i++) {
        if(i != slideIndex )
        {
            noneSlideName = "slide"+i;
            console.log("Looking at " +noneSlideName);
            document.getElementById(`${noneSlideName}`).style.display = 'none';
            console.log("Other Slides Removed");

        }
      }
  }
  
  return (
    <>
    <section className ="adsBar">
            
            <button id="adLeftArrow"  onClick={() => currentSlide(-1)}> adLeftArrow</button>
            <div className ="slides">

                <img id="slide1" src={require("../assets/Ad1.png")} alt="Ad 1" className="slide"></img>

                <img id="slide2" src={require("../assets/Ad2.png")} alt="Ad 2" className="slide"></img>

                <img id="slide3" src={require("../assets/Ad3.png")} alt="Ad 3" className="slide"></img>
                
                
            </div>
            <button id="adRightArrow" onClick={() => currentSlide(1)}> adRightArrow</button>
         </section>
    
    </>
  );
}