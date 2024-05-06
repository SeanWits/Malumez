import React from 'react';
import './product.css';

const Product = ({ imageUrl, price, name, onEdit, onDelete }) => {
  return (
      <article className="product">
          <img src={imageUrl} alt={name} />
          <section className="product-info">
              <h2>{name}</h2>
              <p>R{price}</p>
              <section className="button-container">
                  <button className="edit-btn" onClick={onEdit}>+</button>
                  <button className="delete-btn" onClick={onDelete}>-</button>
              </section>
          </section>
      </article>
  );
};

export default Product;
