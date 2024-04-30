let slideIndex = 1;
initializeSlider(slideIndex);


function moveSlides(n) {
    displaySlide(slideIndex += n);
}
 
function activeSlide(n) {
    displaySlide(slideIndex = n);
}

function initializeSlider(){
    displaySlide(slideIndex);
}
 
/* Main function */
function displaySlide(n) {
    let i;
    // number of ads
    let totalslides = 3;
    
    
 
    if (n > totalslides.length) {
        slideIndex = 1;
    }
 
    if (n < 1) {
        slideIndex = totalslides.length;
    }

    // the current slide comes in
    for (i = 0; i < totalslides.length; i++) {
        totalslides[i].style.display = "none";
    }
    
    // the previous slide goes away 
    totalslides[slideIndex - 1].style.display = "block";
   
}