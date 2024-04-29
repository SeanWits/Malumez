import { IconContext } from "react-icons";
import logo from "../assets/Malume'zLogoFullNoBackground.png";
import './home2.css';
import * as FaIcons from "react-icons/fa";

export function Header(){
    

    return (
        <>
        <section id="headerButtons">
        <img id = "logo" src={logo} alt="Malume'z Logo" height = "60" width="auto"/>
        
        <button onClick={() => alert('Question clicked!')} className="headerButton"><FaIcons.FaQuestionCircle class="icon" /></button>
        <button onClick={() => alert('Basket clicked!')} className="headerButton"><FaIcons.FaShoppingBasket class="icon" /></button>
        <button onClick={() => alert('User clicked!')} className="headerButton"><FaIcons.FaRegUserCircle class="icon" /></button>
        </section>
        
        <header>
            <section id="headerSection">
                <input id="searchBox" type="text" placeholder="Search ....."></input>
                <button id = "searchButton" onClick={() => alert('User clicked!')} className="headerButton"><FaIcons.FaSearch class="icon" /></button>
            </section>
        
        </header>
        </>
      );
}


export function AdsBar()
{
    let brand1=require("../assets/Malume'zLogoFull.png");
    let adImage1=require("../assets/Ad1.png");
    let adImage2=require("../assets/Ad2.png");
    let adImage3=require("../assets/Ad3.png");
  
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
        // intervalID = setInterval(nextSlide,5000);
        // console.log(intervalID);
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

    return (
        <div>
            <div className="slider">
                  <div className="slides">
                    <img alt="Ad 1" className="slide" src={adImage1}/>
    
                    <img alt="Ad 2" className="slide" src={adImage2}/>
    
                    <img alt="Ad 3" className="slide" src={adImage3} />
                  </div>
              <button id="adLeftArrow" onClick={prevAd}> {' '}❮ </button>
              <button id="adRightArrow" onClick= {nextAd}> {' '}❯ </button>
            </div>
       </div>
        
      )
}

// instead of feature products, I call it Brands
export function FeaturedProducts()
{
    
}


//should be renamed to Products
export function Categories()
{
        
}

// export function MoreOptions()
// {
//   return (
//     <>
//     <section className="moreOptions">
//       <section className="contactSection">
//         <h3 className="contactUsHeading">
//           Contact Us
//         </h3>
//         <ul className="contactList">
//           <li>
//           {/* <i className="fa fa-at icon"></i> */}
//             <a href="mailto:malumez@gmail.com">
//               malumez@gmail.com
//             </a>
//             </li>
//           <li>
//           {/* <i className="fa fa-phone icon"></i> */}
//             <a href="tel:malumez@gmail.com">
//               011 625 8639
//             </a>
//             </li>
//           <li>
//           {/* <i className="fa fa-instagram icon"></i> */}
//             <a href="https://www.instagram.com/malumez/">
//               @malumez
//             </a>
//             </li>
//           <li>
//           {/* <i className="fa fa-facebook icon"></i> */}
//             <a href="https://www.facebook.com/malumez/">
//               @malumez
//             </a>
//             </li>
//           <li>
//           {/* <i className="fa fa-twitter icon"></i> */}
//             <a href="https://www.twitter.com/malumez/">
//               @malumez
//             </a>
//               </li>
//           </ul>
//       </section>
//       <section className="storeSection">
//         <h3 className="storeHeading">
//           Stores
//         </h3>
//         <ul className="storeList">
//           <li>
//           {/* <i className="fa fa-seacrh icon"></i> */}
//             <a href="">
//               Find a store
//             </a>
//             </li>
//           <li>
//           {/* <i className="fa fa-money icon"></i> */}
//             <a href="">
//               Become a seller
//             </a>
//             </li>
//           <li>
//           {/* <i className="fa fa-phone icon"></i> */}
//             <a href="">
//               Contact a seller
//             </a>
//             </li>
//           </ul>
//       </section>
//       <section className="accountSection">
//         <h3 className="accountHeading">
//           Account
//         </h3>
//         <ul className="accountList">
//           <li>
//           {/* <i className="fa fa-user icon"></i> */}
//             <a href="">
//               Manage my account
//             </a>
//             </li>
//           <li>
//           {/* <i className="fa fa-truck icon"></i> */}
//             <a href="">
//               Track my order
//             </a>
//             </li>
//             </ul>
//       </section>
//       <section className="helpSection">
//         <h3 className="helpHeading">
//           Help and support
//         </h3>
//         <ul className="helpList">
//           <li>
//           {/* <i className="fa fa-question-circle icon"></i> */}
//             <a href="">
//               FAQ
//             </a>
//             </li>
//           <li>
//           {/* <i className="fa fa-question-circle icon"></i> */}
//             <a href="">
//               Support
//             </a>
//             </li>
//           <li>
//           {/* <i className="fa fa-flag icon"></i> */}
//             <a href="">
//               Report a seller
//             </a>
//             </li>
//           </ul>
//       </section>
//     </section>
//     </>
//   )
// }

export function Footer()
{
  return (
    <>
      <footer>
        <p>
          N-Plusses 2024
        </p>
      </footer>
    </>
  )
}

