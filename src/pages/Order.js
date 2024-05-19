import React, { useEffect, useState } from 'react'

import { Loader } from '../components/loader/Loader';
import { getAll } from '../redux/orders/orders.api';
import ListView from '../components/order-module/ListView';

function Order() {
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    getAll()
      .then((res) => setOrders(res))
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
        {orders && <ListView orders={orders} loadData={loadData} />}
      </div>
    </>
  )
}

export default Order