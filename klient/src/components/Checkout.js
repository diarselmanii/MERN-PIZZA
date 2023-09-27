import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StripesCheckout from 'react-stripe-checkout'
import { placeOrder } from '../actions/orderActions'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Success from '../components/Success'


export default function Checkout({ subtotal }) {
    const orderstate = useSelector((state) => state.placeOrderReducer)
    const { loading, error, success } = orderstate
    const dispatch = useDispatch()
    function tokenHander(token) {
        console.log(token);
        dispatch(placeOrder(token, subtotal))
    }
    return (
        <div>

            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}
            {success && (<Success success='Your order placed successfully' />)}


            <StripesCheckout
                amount={subtotal * 100}
                shippingAddress
                token={tokenHander}
                stripeKey='pk_test_51MXC6UH4yJErZSA7XkjFwBmF0DqBcMCw4RdKLxEgpC8k5nWGndPv2Ypl1sXhVywGiQZqe52LI2McmqsBCvzJQk4y00lyJc21Z0'
                currency='EUR'
            >

                <button className='btn'>Pay Now</button>


            </StripesCheckout>


        </div>
    )
}
