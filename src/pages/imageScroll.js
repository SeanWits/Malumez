//image slider

let slides = document.querySelectorAll(".slides img");

// we use this to start at the first slide
let slideIndex = 0;

//initializeSlider();
document.addEventListener("DOMContentLoaded", initializeSlider());
//function to initialize slider -  SHow first slide
function initializeSlider(){

    if(slides.length>0){
        slides[slideIndex].classList.add("displaySlide");
        // this is to automatically display the next slide after 5 seconds
        intervalID = setInterval(nextSlide,5000);
        console.log(intervalID);
    }
    
}


function showSlide(index){

    // to check the images and make sure they loop
    if(index>= slides.length){
        slideIndex =0;

    }
    else if(index<0)
    {
        slideIndex = slides.length -1;
    }
    slides.forEach(slide =>{
        slide.classList.remove("displaySlide")
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevAd(){
    slideIndex--;
    showSlide(slideIndex);
}

function nextAd(){
    slideIndex++;
    showSlide(slideIndex);
}
