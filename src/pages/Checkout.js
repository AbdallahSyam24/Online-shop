import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleBtnCart, clearCart } from '../redux/products/products.slice';

import PersonalInformation from '../components/checkout-module/PersonalInformation';
import PaymentInformation from '../components/checkout-module/PaymentInformation';
import Overall from '../components/checkout-module/Overall';
import { checkout } from '../redux/products/products.api';
import { useNavigate } from 'react-router';

function Checkout() {
    const pages = ['personal', 'payment', 'overall'];
    const { cart } = useSelector(state => state.product);

    const [inputs, setInputs] = useState({});
    const [page, setPage] = useState(0);
    const [formErrors, setFromErrors] = useState([]);
    const navigate = useNavigate();

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(toggleBtnCart(false));
        setFromErrors([]);
    }, [page])


    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handlePage = (type) => {
        if (type === 'next') {
            setPage(page + 1);
        } else {
            setPage(page - 1);
        }
    }

    const validate = (fields) => {
        const errors = [];

        fields.map((field) => {
            if (!inputs[field]) {
                errors.push(field);
            }
        });

        return errors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const fields = [
            "name",
            "email",
            "phone",
            "street",
            "city",
            "zip",
            "creditCardType",
            "ccNumber",
            "dateValid",
            "ccv",
        ];

        const errors = validate(fields);

        if (errors.length === 0) {
            checkout({...inputs, items: cart})
                .then((res) => setFromErrors(errors))
                .then((res) => navigate('/'))
                .then((res) => clearCart(cart))
                .catch((e) => console.log(e));
        } else {
            setFromErrors(errors);
        }
    }

    return (
        <div className='container max-w-[1240px] mx-auto mt-[70px] flex-auto'>
            <form onSubmit={handleSubmit}>
                <h1>Checkout</h1>

                <section>
                    {pages[page] === 'personal' && <PersonalInformation inputs={inputs} handleChange={handleChange} />}

                    {pages[page] === 'payment' && <PaymentInformation inputs={inputs} handleChange={handleChange} />}

                    {pages[page] === 'overall' && <Overall cart={cart} inputs={inputs} formErrors={formErrors} />}

                    <div className='form-group center'>
                        {page > 0 && <button className='btn-danger' type='button' onClick={() => handlePage('prev')}>Prev</button>}
                        {page < pages.length - 1 && <button className='btn-success' type='button' onClick={() => handlePage('next')}>Next</button>}
                    </div>
                </section>

            </form>

        </div>
    )
}

export default Checkout