import React, { useEffect, useState } from "react"
import { ProductItem } from "../components/product-item/ProductItem"
import { Loader } from "../components/loader/Loader"
import { getAll } from "../redux/products/products.api";
import { useDispatch } from "react-redux";
import { setProductsList } from "../redux/products/products.slice";

export function HomePage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        getAll()
            .then((res) => {
                setProducts(res);
                return res;
            })
            .then((res) => dispatch(setProductsList(res)))
            .then(() => setIsLoading(false))
            .catch((e) => console.log(e));
    }, [])

    const renderProducts = () => {
        return products?.map(product => <ProductItem key={product.id} product={product} />)
    }

    return (
        <>
            <div className='container mb-[20px] mt-[60px] max-w-[1240px] flex flex-col justify-center items-center xl:flex xl:justify-center xl:flex-row xl:items-start mx-auto transition-all flex-auto'>
                {isLoading && <Loader />}
                <>
                    <div className='lg:w-3/5 xl:w-1/5 flex flex-col items-center mt-[10px]'>
                    </div>
                    <div className='w-4/5 flex flex-wrap justify-center md:w-full xl:justify-start xl:ml-[20px]'>
                        {renderProducts()}
                    </div>
                </>
            </div>
        </>
    )
}
