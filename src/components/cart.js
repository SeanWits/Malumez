// import React from 'react';
import './cart.css';

const Cart = ({ cartID, dateOrdered,items, total, status }) => {
    //the items can also be added in Dynamically so that we don't have to do things on a seperate page
  return (
      <div className="cart">
          <div className="cart-info">
              <h2>{cartID}</h2>
              <h3>{status}</h3>
              <h4>{dateOrdered}</h4>
              <p>R{total}</p>         
                   {/*list for items must generate reccursively  */}
              <button className="seeCartDetails" >See More details</button> 
          </div>
      </div>
  );
};

export default Cart;