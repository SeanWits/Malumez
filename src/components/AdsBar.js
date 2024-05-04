
import React, { useEffect } from 'react';


export function AdsBar()
{
  let slideIndex = 1;
  let totalSlides = 3;
  let slideName = "slide"+slideIndex;

  useEffect(() => {
    // Call startingUp function once all images are loaded
    startingUp();
    const interval = setInterval(() => {
      currentSlide(1); // Change to the next slide
    }, 5000);
  
    // Clear interval so that it can start the countdown again
    return () => clearInterval(interval);
    
  }, []); 


  //loading the initial ads
  function startingUp()
  {
    document.getElementById("slide1").style.display = 'block';
    document.getElementById("slide2").style.display = 'none';
    document.getElementById("slide3").style.display = 'none';
    setInterval(currentSlide(1), 5000);
  }
  

  // this function changes the slides, either using the arrows or looping through the intervals
  function currentSlide(n)
  {
      // the current slide becomes visible
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
      currentSlide.style.display = 'block';

      // Hide the other slides
      for (i = 1; i <= totalSlides; i++) {
        if(i !== slideIndex )
        {
            noneSlideName = "slide"+i;
            document.getElementById(`${noneSlideName}`).style.display = 'none';
        }
      }
      
  }
  
  
  
  return (
    <>
    <section className ="adsBar">
            
             <i className='fa fa-chevron-left icon left' onClick={() =>currentSlide(1)} id='adLeftArrow'/>
            <div className ="slides">

                <img id="slide1" src={require("../assets/Ad1.png")} alt="Ad 1" className="slide"></img>

                <img id="slide2" src={require("../assets/Ad2.png")} alt="Ad 2" className="slide"></img>

                <img id="slide3" src={require("../assets/Ad3.png")} alt="Ad 3" className="slide"></img>
                
                
            </div>
            <i className= 'fa fa-chevron-right icon right fa' onClick={() =>currentSlide(1)} id='adRightArrow'/>
         </section>
    
    </>
  );
}