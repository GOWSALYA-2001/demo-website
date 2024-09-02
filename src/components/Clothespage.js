import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageIcon from '../assessts/2.jpg'

const Clothespage = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    let myProduct = localStorage.getItem("_MY_PRODUCT_LIST");

    if (myProduct) {
      myProduct = JSON.parse(myProduct);
    }

    if (myProduct.length > 0) {
      console.log(myProduct);
      let interchangeArr = [];
      myProduct.forEach((item) => {
        interchangeArr.push({
          id: item.id ? item.id : "",
          product_name: item.ProductName ? item.productName : "",
          price: item.price ? item.price : "",
          discount: item.discount ? item.discount : "",
          selling_price: item.sellingPrice ? item.sellingPrice : "",
          description: item.description ? item.description : "",
          // images: item.image ? [item.image] : [],
          images: item.image ? [item.image] : [ImageIcon],
          category: "formal",
          gender: "woman",
        });
      });

      
      setProduct(interchangeArr);
  
    }
  }, []);

  const navigate = useNavigate();

  const handleViewMore = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="clothes-page">
      <header className="header">
        <h1>Clothing Collection</h1>
      </header>

      <main className="main-content" style={{ width: "90%", margin: "auto" }}>
        <div className="controls mt-3">
          <button className="btn btn-light">Sort by</button>
          <button className="btn btn-light">Filter</button>
        </div>
        <div className="products-container">
          {products.map((product) => (
            <div className="product-card  m-auto" key={product.id}>
              <img
                className="product-image"
                src={product.images[0]} // Assuming first image for simplicity
                alt={product.product_name}
              />
              <div className="product-info">
                <h5 className="product-title">{product.product_name}</h5>
                <p className="product-price">${product.price}</p>
                <button
                  className="btn btn-view-more"
                  onClick={() => handleViewMore(product)}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Clothespage;
