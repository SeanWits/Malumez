// import { Router, useNavigate } from 'react-router-dom';


export function FeaturedProducts()
{
  let brandImage=require("../../assets/Malume'zLogoFull.png");

  return (
    <>
      <section  className="featuredProducts">
        <i className="fa fa-chevron-left icon left"></i>
        <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
        <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
        <img className="brandImage" src={brandImage} alt="Image of a featured product"></img>
        <i className="fa fa-chevron-right icon right"></i>
      </section>
    </>
  )
}