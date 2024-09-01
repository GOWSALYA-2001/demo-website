import React from 'react';
import { useLocation } from 'react-router-dom';


const ProductDetailpage = () => {
    const location = useLocation();
    const { product } = location.state;

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <img src={product.images[0]} alt={product.product_name} className='img-fluid product-image' />
                </div>
                <div className='col-md-6'>
                    <h1 className='product-title'>{product.product_name}</h1>
                    <h3 className='product-price'>${product.price}</h3>
                    <h5 className='product-discount'>Discount: {product.discount}%</h5>
                    <h5 className='product-selling-price'>Selling Price: ${product.selling_price}</h5>
                    <p className='product-description'>{product.description}</p>
                    <div className='size-selector'>
                        <button className='size-button'>S</button>
                        <button className='size-button'>M</button>
                        <button className='size-button'>L</button>
                        <button className='size-button'>XL</button>
                        <button className='size-button'>XXL</button>
                    </div>
                    <button className='add-to-cart-btn'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailpage;
