import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { getByID, getComment } from '../../redux/products/products.api';
import { Loader } from '../loader/Loader';

function DetailView() {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);


  const navigate = useNavigate();

  const params = useParams();
  const productID = params.id;


  useEffect(() => {
    getComment(productID)
      .then((res) => setComments(res.items))
      .catch((e) => console.log(e));

    getByID(productID)
      .then((res) => setInputs(res))
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));

  }, [productID])


  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  return (
    <div className='container max-w-[1240px] mx-auto mt-[70px] flex-auto'>
      {isLoading && <Loader />}
      {!isLoading &&
        <section>
          <div className='form-group'>
            <label>Number: </label>
            <input type='text' name='id' value={inputs.id} onChange={handleChange} disabled />
          </div>

          <div className='form-group'>
            <label>Title: </label>
            <input type='text' name='title' value={inputs.title} onChange={handleChange} disabled />
          </div>

          <div className='form-group'>
            <label>Price: </label>
            <input type='number' name='price' value={inputs.price} onChange={handleChange} disabled />
          </div>

          <div className='form-group'>
            <label>Description: </label>
            <textarea name='description' value={inputs.description} onChange={handleChange} disabled></textarea>
          </div>

          <div className='form-group'>
            <label># is stock: </label>
            <input type='number' name='stock' value={inputs.stock} onChange={handleChange} disabled />
          </div>

          {comments.length > 0 &&
            <div className="comment-section">
              <hr />
              <h1>Comments</h1>
              <br />
              <ul style={{ listStyle: "disc" }}>
                {comments.map((com) => <li key={com.reviewId}>{com.description}</li>)}
              </ul>
              <br />
            </div>
          }


          <div className='form-group center'>
            <button className='btn-danger' type='submit' onClick={() => navigate('/employee')}>Back</button>
          </div>
        </section>
      }

    </div>
  )
}

export default DetailView