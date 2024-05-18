import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { MoreOptions } from "../components/Home/More_Options";
import { SearchBar } from "../components/Home/Search";
import { useEffect, useState } from "react";


function OrderStatus() {

    const [carts, setCarts] = useState([]);

    console.log("We have reached the order Status page");
    // useEffect(() => {
    //     fetchCarts();
    // }, []);

    // we need to get the carts from the database
    // async function fetchCarts() {
    //     try {
    //         const cartQuerySnapshot = await getDocs(collection(db, "users", userID, "carts"));

    //         let allCarts = [];

    //         // currently this gets the carts of every user so we will edit the queries to get the cart of the user logged in
    //             cartsQuerySnapshot.forEach((cartDoc) => {
    //                 //Loop through and only add the ones where each cart has the status>0, ordered or above 
    //                 /*status: 0 = Active (Not yet checked out), 1 = Ordered (Checked out), 2 =  packing (preparing the order), 
    //                 3 = Ready to collect, 4 =cancelled (either by the user or by the seller), 5 = Completed
    //                 */
    //                 const cartData = cartDoc.data();
    //                 if(cartData.status>0){
    //                 allCarts.push({
    //                     cartId: cartDoc.cartId,
    //                     dateOrdered: cartDoc.dateOrdered,
    //                     items:cartDoc.items,
    //                     total: cartDoc.total,
    //                     status:cartDoc.status
    //                 });
    //             }
    //             });
    //         setCarts(allCarts);

    //     } catch (error) {
    //         console.error('Error fetching user carts:', error);
    //       }

    //   }

    return (
    <>
        <section>
        <h1>Order Status</h1>
        </section>
        
        <h2>Orders</h2>
        <section id="orders-container">
            {/* The carts will go here and will be formatted  */}
            {/* <div className="cartContainers">
            { carts.map((cart) => (
                      <Cart
                          key={cart.cartId}
                          dateOrdered={cart.dateOrdered}
                          items={cart.items}
                          total={cart.total}
                          status={cart.status}
                      />
                  ))}

            </div> */}
            
        </section>

    </>  
    );
}

function OrderStatusPage() {
    return (
        <>
        <Header />
        <SearchBar />
        <OrderStatus/>
        <MoreOptions />
        <Footer />
    </>
    );
  }
  
  export default OrderStatusPage;
