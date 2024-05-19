import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

import { Loader } from '../loader/Loader';
import { getByID } from '../../redux/orders/orders.api';

function DetailView() {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const params = useParams();
  const orderID = params.id;


  useEffect(() => {
    getByID(orderID)
      .then((res) => setInputs(res))
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));

  }, [orderID])

  return (
    <div className='container max-w-[1240px] mx-auto mt-[70px] flex-auto'>
      {isLoading && <Loader />}
      {!isLoading &&
        <section>

          <div className='form-group'>
            <label>Name: </label>
            <input type='text' name='name' value={inputs.name} disabled />
          </div>

          <div className='form-group'>
            <label>Email: </label>
            <input type='text' name='email' value={inputs.email} disabled />
          </div>

          <div className='form-group'>
            <label>Phone: </label>
            <input type='text' name='phone' value={inputs.phone} disabled />
          </div>

          <div className='form-group'>
            <label>Street: </label>
            <input type='text' name='street' value={inputs.street} disabled />
          </div>

          <div className='form-group'>
            <label>City: </label>
            <input type='text' name='city' value={inputs.city} disabled />
          </div>

          <div className='form-group'>
            <label>Zip: </label>
            <input type='text' name='zip' value={inputs.zip} disabled />
          </div>

          <div className='form-group'>
            <label>Status: </label>
            <input type='text' name='status' value={inputs.status} disabled />
          </div>

          <div className='form-group center'>
            <button className='btn-danger' type='submit' onClick={() => navigate('/order')}>Back</button>
          </div>

        </section>
      }

    </div>
  )
}

export default DetailView