import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router';

import { deleteByID } from '../../redux/products/products.api';

function ListView({ products, loadData }) {

    const navigate = useNavigate();

    const swal = withReactContent(Swal);

    const handleDelete = (productID) => {
        swal.fire({
            title: "Are you sure?",
            text: "This action can`t be undone!",
            icon: "warning",
            confirmButtonColor: "#DD6B55",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                deleteByID(productID)
                    .then(() => loadData())
                    .catch((e) => console.log(e));
            }
        });
    }

    return (
        <div className='w-4/5 flex flex-wrap justify-center md:w-full xl:ml-[20px]'>
            <div className='col'>
                <button className='btn-success btn-right' onClick={() => navigate(`/employee/addView`)}>Add</button>
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td className='action-fields'>
                                <button className='btn-warning action-btn' onClick={() => navigate(`/employee/editView/${product.id}`)}>Edit</button>
                                <button className='btn-more action-btn' onClick={() => navigate(`/employee/detailView/${product.id}`)}>Details</button>
                                <button className='btn-danger action-btn' onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ListView