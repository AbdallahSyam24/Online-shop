import React from 'react'

function PaymentInformation({ inputs, handleChange }) {
  return (
    <section>
      <div className='form-group'>
        <label>CreditCard Type: </label>

        <select name='creditCardType' value={inputs.creditCardType} onChange={handleChange} required>
          <option value=""></option>
          <option value="Mastercard">Mastercard</option>
          <option value="Visa">Visa</option>
        </select>
      </div>

      <div className='form-group'>
        <label>CreditCard #: </label>
        <input type='number' name='ccNumber' value={inputs.ccNumber} onChange={handleChange} required />
      </div>

      <div className='form-group'>
        <label>Date valid: </label>
        <input type='date' name='dateValid' value={inputs.dateValid} onChange={handleChange} required />
      </div>

      <div className='form-group'>
        <label>Validation code: </label>
        <input type='number' name='ccv' value={inputs.ccv} onChange={handleChange} required />
      </div>
    </section>
  )
}

export default PaymentInformation