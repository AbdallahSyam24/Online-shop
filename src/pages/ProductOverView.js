import React, { useEffect, useState } from "react";
import { Loader } from "../components/loader/Loader";
import { ProductDetailItem } from "../components/product-detail-item/ProductDetailItem";
import { useParams } from "react-router";
import { getByID, getComment } from "../redux/products/products.api";

export function ProductOverView() {
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [comments, setComments] = useState([]);

    const param = useParams();
    const id = param.id;

    const loadData = () => {
        getByID(id)
            .then((res) => setProduct(res))
            .then(() => setIsLoading(false))
            .catch((e) => console.log(e));

        getComment(id)
            .then((res) => setComments(res.items))
            .catch((e) => console.log(e));
    }

    useEffect(() => {
        loadData();
    }, [id])


    return (
        <div className='container max-w-[1240px] mx-auto mt-[70px] flex-auto'>
            {isLoading && <Loader />}
            {
                product && <ProductDetailItem loadData={loadData} product={product} comments={comments} />
            }
        </div>
    )
}
