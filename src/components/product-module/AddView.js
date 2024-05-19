import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { createNew } from '../../redux/products/products.api';

function AddView() {
  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    createNew(inputs)
      .then((res) => console.log(res))
      .then(() => navigate('/employee'))
      .catch((e) => console.log(e));
  }

  return (
    <div className='container max-w-[1240px] mx-auto mt-[70px] flex-auto'>

      <section>
        <form onSubmit={handleSubmit}>

          <div className='form-group'>
            <label>Number: </label>
            <input type='text' name='id' value={inputs.id} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label>Title: </label>
            <input type='text' name='title' value={inputs.title} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label>Price: </label>
            <input type='number' name='price' value={inputs.price} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label>Description: </label>
            <textarea name='description' value={inputs.description} onChange={handleChange} required></textarea>
          </div>

          <div className='form-group'>
            <label># is stock: </label>
            <input type='number' name='stock' value={inputs.stock} onChange={handleChange} required />
          </div>

          <div className='form-group'>
            <label>Image URL </label>
            <input type='text' name='imageUrl' value={inputs.imageUrl} onChange={handleChange} required />
          </div>


          <div className='form-group center'>
            <button className='btn-success' type='submit'>Save</button>
          </div>



        </form>
      </section>

    </div>
  )
}

export default AddView