import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from 'react';

export function FeaturedProducts() {
  let slideIndex = 1;
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();
  const totalSlides = 3;

  useEffect(() => {
    fetchBrands();
  }, []);

  async function fetchBrands() {
    try {
      const brandQuerySnapshot = await getDocs(collection(db, "brands"));
      let allBrands = [];
      
      if (!brandQuerySnapshot.empty) {
        brandQuerySnapshot.forEach((doc) => {
          const brandData = doc.data();
          allBrands.push({
            id: doc.id,
            name: brandData.name,
            src: brandData.src
          });
        });
      }
      setBrands(allBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  }

  function currentSlide(n) {
    slideIndex += n;
    if (slideIndex > totalSlides) {
      slideIndex = 1;
    }
    if (slideIndex < 1) {
      slideIndex = totalSlides;
    }
    showSlide(slideIndex);
  }

  function showSlide(index) {
    for (let i = 1; i <= totalSlides; i++) {
      const slide = document.getElementById(`fPslide${i}`);
      if (slide) {
        slide.style.display = i === index ? 'block' : 'none';
      }
    }
  }

  function brandClicked(brandName) {
    localStorage.setItem("searchInput",brandName);
    navigate('/products');
    console.log(brandName);
  }

  return (
    <>
      <h2 id="brandsHeading">Brands</h2>
      <section className="featuredProducts">
        <i className="fa fa-chevron-left icon left" onClick={() => currentSlide(-1)}></i>
        {[1, 2, 3].map((index) => (
          <section key={`fPslide${index}`} id={`fPslide${index}`} style={{ display: index === 1 ? 'block' : 'none' }}>
            {brands.slice((index - 1) * 4, index * 4).map((brand) => (
              // eslint-disable-next-line
              <img
                key={brand.id}
                className="brandImage"
                id={brand.name}
                src={brand.src}
                alt="Image of a featured product"
                onClick={() => brandClicked(brand.name)}
              />
            ))}
          </section>
        ))}
        <i className="fa fa-chevron-right icon right" onClick={() => currentSlide(1)}></i>
      </section>
    </>
  );
}
