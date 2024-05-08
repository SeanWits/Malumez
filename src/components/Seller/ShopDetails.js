import "../../pages/products.css";

export function ShopDetails() {
  return (
    <>
      <section id="filters">
        <h2 className="shopDetailsHeading">Shop Details</h2>
        <ul className="shopDetails">
          <li>Shop Name:</li>
          <li>Shop Location:</li>
          <li>Shop Owner:</li>
          <li>Shop Contact Details:</li>
        </ul>
      </section>
    </>
  );
}
