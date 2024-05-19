import React from 'react'

function Overall({ cart, inputs, formErrors }) {

  const totals = () => {
    let price = 0;
    let quantity = 0;
    cart.forEach(item => {
      price += item.price * item.quantity;
      quantity += item.quantity;
    });

    return { price: price.toFixed(2), quantity };
  }

  const { price, quantity } = totals();

  return (
    <>

      {formErrors.length > 0 &&
        <section>
          <div className='alert-danger'><strong>Please make sure to fill the below field:</strong>
            <ul style={{
              color: "red",
              fontWeight: "bolder",
              listStyle: "disc"
            }}>{formErrors.map((e) => <li key={e}>{e}</li>)}</ul></div>
        </section>
      }


      <section style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p><strong>Name: </strong>{inputs.name}</p>
          <p><strong>Email: </strong>{inputs.email}</p>
          <p><strong>Phone: </strong>{inputs.phone}</p>
          <p><strong>Street: </strong>{inputs.street}</p>
          <p><strong>City: </strong>{inputs.city}</p>
          <p><strong>Zip: </strong>{inputs.zip}</p>
          <p><strong>CreditCard type: </strong>{inputs.creditCardType}</p>
          <p><strong>CreditCard #: </strong>{inputs.ccNumber}</p>
          <p><strong>Date valid: </strong>{inputs.dateValid}</p>
          <p><strong>Validation code: </strong>{inputs.ccv}</p>
        </div>


        <div>
          <p><strong>Cart</strong></p>
          <table className='table'>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item =>
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>-</td>
                <td>{quantity}</td>
                <td>{price}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>


      <div className='form-group center'>
        <button className='btn-success' type='submit'>Submit</button>
      </div>

    </>


  )
}

export default Overall