import './cart.css';

const Cart = ({ cartID, dateOrdered,items, total, status }) => {
    //the items can also be added in Dynamically so that we don't have to do things on a seperate page
    // alternatively, items can display on the OrderTracking page instead?
  return (
      <div className="cart">
          <div className="cart-info">
              <h2>{cartID}</h2>
              <h3>{status}</h3>
              <h4>{dateOrdered}</h4>
              <p>R{total}</p>         
                   {/*list for items must generate recursively  */}
              <button className="seeCartDetails" >See More details</button> 
          </div>
      </div>
  );
};

export default Cart;