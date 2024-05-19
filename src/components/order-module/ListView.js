import React from 'react';
import { useNavigate } from 'react-router';
import { updateOrderStatus } from '../../redux/orders/orders.api';

function ListView({ orders, loadData }) {

    orders.map((or) => {
        console.log(or.status);
    })

    const navigate = useNavigate();

    const handleStatusUpdate = (e, id) => {
        updateOrderStatus(id, e.target.value)
            .then(() => loadData())
            .catch((e) => console.log(e))
    }

    return (
        <div className='w-4/5 flex flex-wrap justify-center md:w-full xl:ml-[20px]'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order =>

                        <tr key={order.orderId}>
                            <td>{order.name}</td>
                            <td>
                                <select name='status' onChange={(e) => handleStatusUpdate(e, order.orderId)}>
                                    <option value="PLACED" selected={order.status === 'PLACED' ? true : false}>Placed</option>
                                    <option value="shipped" selected={order.status === 'SHIPPED' ? true : false}>Shipped</option>
                                    <option value="delivered" selected={order.status === 'DELIVIRED' ? true : false}>Deliverd</option>
                                </select>
                            </td>
                            <td className='action-fields'>
                                <button className='btn-more' style={{ width: "30%" }} onClick={() => navigate(`/order/detailView/${order.orderId}`)}>Details</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListView