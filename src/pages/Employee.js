import React, { useEffect, useState } from 'react';
import { Loader } from '../components/loader/Loader';
import { getAll } from '../redux/products/products.api';
import ListView from '../components/product-module/ListView';

function Employee() {
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const loadData = () => {
        getAll()
            .then((res) => setProducts(res))
            .then(() => setIsLoading(false))
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <div className='container mb-[20px] mt-[60px] max-w-[1240px] flex flex-col justify-center items-center xl:flex xl:justify-center xl:flex-col xl:items-start mx-auto transition-all flex-auto'>
                {isLoading && <Loader />}
                {products && <ListView products={products} loadData={loadData} />}
            </div>
        </>
    )
}

export default Employee