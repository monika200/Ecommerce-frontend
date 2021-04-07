import React from 'react'
import './style.css'
const Products = (props) => {
    return (
        <div className="productContainer">
           {props.products.map((products) => (
            <div key={products.id} className="product">
            <h3>{products.Name}</h3>
            <p>{products.Description}</p>
            <h5>{products.price}</h5>
            <button onClick={() => props.buyNow(products.id)}>Buy Now</button>
            </div>
           ))}
          
        </div>
    );
};

export default Products;
