import { useNavigate } from 'react-router-dom';

export function Categories()
{
  const navigate = useNavigate();

  let productImage=require("../../assets/Malume'zLogoFull.png");
  let categoryName = "Products";
  return (
    <>
      <section className="categorySection">
        <section className="categoryText">
          <h2 className="categoryHeading">
            {categoryName}
          </h2>
          <button onClick={() => navigate('/products')} className="viewMoreLink"> View More</button>
          
        </section>
        <section className="productSection">
          <img className="productImage" src={productImage} alt="product" />
          <img className="productImage" src={productImage} alt="product" />
          <img className="productImage" src={productImage} alt="product" />
        </section>
      </section>
    </>
  )
  
}