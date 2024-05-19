import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function Search() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false);

    const { productsList } = useSelector(state => state.product);

    useEffect(() => {
        setProducts(productsList);
    }, [productsList])

    const handleChange = (e) => {
        setSearch(e.target.value);

        if (e.target.value.length) {
            setDropdown(true);
        } else {
            setDropdown(false);
        }
    };

    const clickHandler = () => {
        setDropdown(false);
        setSearch("");
    }

    const renderProducts = () => {
        if (search.length > 0) {
            return products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
                .map((product) => <Link to={`/products/${product.id}`} onClick={() => clickHandler(product.id)}
                    className='text-black flex items-center max-h-[80px] mb-4 border-b pb-2 last:border-0 last:mb-0 hover:opacity-50 transition'
                    key={product.id}>
                    <img className='w-[50px] mr-4 max-h-[75px]' src={product.image || "https://semantic-ui.com/images/wireframe/white-image.png"}  />
                    <div>
                        <p className='text-base'>{product.title}</p>
                        <p className='text-md font-medium'>$ {product.price}</p>
                    </div>
                </Link>);
        }
    }


    return (
        <>
            <div className={'bg-white rounded rounded-r-md hidden items-center relative w-[390px] md:flex md:justify-between'} >
                <FontAwesomeIcon icon={faSearch} className='text-black pr-1 pl-2' />
                <input
                    type="text"
                    placeholder='Search products...'
                    className='px-1 text-lg text-black outline-0 h-[35px] w-full focus:outline-none'
                    value={search}
                    onChange={handleChange}
                />
                {dropdown &&
                    <div className='absolute left-0 top-[36px] right-0 bg-white p-2 border border-black rounded max-h-[500px] overflow-y-auto search-box'>
                        {renderProducts()}
                    </div>
                }
            </div>
        </>
    )
}
