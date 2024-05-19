import React, { useEffect, useState } from "react";
import { faCartShopping, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/products/products.slice";
import { addComment } from "../../redux/products/products.api";

export function ProductDetailItem({ loadData, product, comments }) {
    const [comment, setComment] = useState();

    const { cart } = useSelector(state => state.product);

    const isCart = cart.find(el => el.id === product.id);
    const dispatch = useDispatch();

    const addProduct = () => dispatch(addProductToCart(product));

    const inStock = product.stock > 0;

    const handlePostComment = () => {
        addComment(product.id, comment)
            .then(() => setComment(''))
            .then(() => loadData())
            .catch((e) => console.log(e))
    }


    return (
        <>
            <div className='px-2 pb-6'>
                <p className='capitalize text-gray-500 mb-6 text-sm font-semibold sm:text-base'>
                </p>
                <div className='flex flex-col justify-center items-center lg:flex lg:flex-row lg:justify-between lg:items-start'>
                    <div className='w-full shadow-lg rounded-md flex justify-center items-center lg:w-2/4 sm:w-3/4'>
                        <img className='w-2/4 lg:w-3/4' src={product.image || "https://semantic-ui.com/images/wireframe/white-image.png"} alt={product.title} />
                    </div>
                    <div className='w-full pl-0 sm:w-3/4 lg:w-2/4 lg:pl-[30px]'>
                        <div>
                            <p className='font-medium text-xl mt-5 lg:mt-0 md:text-2xl'>{product.title}</p>
                            <p className='my-4 text-xl sm:text-2xl'>${product.price}</p>
                            <p className='text-base mt-4 sm:text-lg'>{product.description}</p>
                            <button
                                onClick={addProduct}
                                disabled={isCart || !inStock}
                                className={`w-full bg-black mt-8 text-md rounded-md text-white transition px-[80px] py-[15px] sm:text-lg md:w-fit ${isCart ? 'border px-[40px] py-[10px]' : 'hover:bg-gray-800'}`}
                            >
                                {
                                    isCart
                                        ? <FontAwesomeIcon className='text-[25px] sm:text-[30px]' icon={faCheck} />
                                        : product.stock > 0
                                            ? <> Add to bag
                                                <span className='ml-2'><FontAwesomeIcon icon={faCartShopping} /></span>
                                            </>
                                            : "Not avilable now!"
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className="comment-section">
                    <hr />
                    <h1>Comments</h1>
                    <br />
                    <ul style={{ listStyle: "disc" }}>
                        {comments.map((com) => <li key={com.reviewId}>{com.description}</li>)}
                    </ul>
                    <br />
                    <br />
                    <textarea style={{ width: "100%" }} name="commentField" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add comment..."></textarea>
                    <br />
                    <button type="button" className="btn-success" onClick={handlePostComment}>Post</button>
                </div>

            </div>
        </>
    )
}
