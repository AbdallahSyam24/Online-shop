import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addProductToCart } from "../../redux/products/products.slice";
import { faCartShopping, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export function ProductItem({ product }) {
    const { cart } = useSelector(state => state.product);
    const isCart = cart.find(el => el.id === product.id);
    const dispatch = useDispatch();

    const inStock = product.stock > 0;

    const addToCart = (e) => {
        e.preventDefault();
        dispatch(addProductToCart(product));
    }

    return (
        <Link to={`/products/${product.id}`} className='w-[300px] h-[400px] shadow-md mt-[10px] border relative rounded-lg productItem transition-all duration-300 sm:mr-[5px] sm:ml-[5px]'>
            <img className='w-[100px] m-auto mt-[50px]' src={product.image || "https://semantic-ui.com/images/wireframe/white-image.png"} alt={product.title} />
            <div className='absolute left-0 right-0 top-[250px] text-center'>{product.title}</div>
            <div className='absolute left-0 right-0 bottom-[45px] flex justify-between items-center'>
                <span id="productPrice" className='ml-4 text-xl'>${product.price}</span>
                <button id={"addProduct_" + product.id} onClick={addToCart} disabled={isCart || !inStock}>
                    {isCart
                        ? <div className='relative'>
                            <FontAwesomeIcon icon={faCartShopping} className='text-2xl mr-6' />
                            <sup><FontAwesomeIcon icon={faCircleCheck} className='absolute right-[18px] text-[#00a046] bg-white rounded-full' /></sup>
                        </div>
                        : product.stock > 0 ? <FontAwesomeIcon icon={faCartShopping} className='mr-6 text-2xl' /> : <span className='mr-6' style={{ color: "red" }}>Not avilable now!</span>
                    }
                </button>
            </div>
        </Link>
    )
}
