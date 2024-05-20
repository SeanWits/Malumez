import React, { useState, useEffect } from 'react';

export function AdsBar() {
  const [slideIndex, setSlideIndex] = useState(1);
  const totalSlides = 3;

  useEffect(() => {
    startingUp();
    const interval = setInterval(() => {
      currentSlide(1);
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  },
  // eslint-disable-next-line 
  []);

  function startingUp() {
    // Initially display the first slide and hide others
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
      slide.style.display = index === 0 ? 'block' : 'none';
    });
  }

  function currentSlide(n) {
    let newIndex = slideIndex + n;
    if (newIndex > totalSlides) {
      newIndex = 1;
    } else if (newIndex < 1) {
      newIndex = totalSlides;
    }
    setSlideIndex(newIndex);
  }

  return (
    <>
      <section className="adsBar">
        <i
          className="fa fa-chevron-left icon left"
          onClick={() => currentSlide(-1)}
          id="adLeftArrow"
          data-testid="adLeftArrow"
        />
        <div className="slides">
          {[...Array(totalSlides)].map((_, index) => (
            <img
              key={index}
              src={require(`../../assets/Ad${index + 1}.png`)}
              alt={`Ad ${index + 1}`}
              className="slide"
              style={{ display: index + 1 === slideIndex ? 'block' : 'none' }}
              data-testid={`slide${index + 1}`}
            />
          ))}
        </div>
        <i
          className="fa fa-chevron-right icon right fa"
          onClick={() => currentSlide(1)}
          id="adRightArrow"
          data-testid="adRightArrow"
        />
      </section>
    </>
  );
}
