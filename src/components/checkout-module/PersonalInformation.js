import React from 'react'

function PersonalInformation({ inputs, handleChange }) {
    return (
        <section>
            <div className='form-group'>
                <label>Name: </label>
                <input type='text' name='name' value={inputs.name} onChange={handleChange} required />
            </div>

            <div className='form-group'>
                <label>Email: </label>
                <input type='email' name='email' value={inputs.email} onChange={handleChange} required />
            </div>

            <div className='form-group'>
                <label>Phone: </label>
                <input type='number' name='phone' value={inputs.phone} onChange={handleChange} min={7} required />
            </div>

            <div className='form-group'>
                <label>Street: </label>
                <input type='text' name='street' value={inputs.street} onChange={handleChange} required />
            </div>

            <div className='form-group'>
                <label>City: </label>
                <input type='text' name='city' value={inputs.city} onChange={handleChange} required />
            </div>

            <div className='form-group'>
                <label>Zip: </label>
                <input type='number' name='zip' value={inputs.zip} onChange={handleChange} required />
            </div>
        </section>
    )
}

export default PersonalInformation