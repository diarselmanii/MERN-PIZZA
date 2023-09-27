import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderActions'
import Error from '../components/Error'
import Loading from '../components/Loading'
import AOS from 'aos'
import 'aos/dist/aos.css'
export default function Ordersscreen() {

    AOS.init()
    const dispatch = useDispatch()
    const orderstate = useSelector(state => state.getUserOrderReducer)
    const { orders, error, loading } = orderstate
    useEffect(() => {
        dispatch(getUserOrders())
    }, [])
    return (
        <div>
            <h2 style={{ fontsize: '35px' }}>My Orders</h2>
            <div className='row justify-content-center' >
                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {orders && orders.map(order => {
                    return <div className="col-md-8 m-2 p-2" data-aos='fade-down' style={{ backgroundColor: 'whitesmoke', color: 'black', borderRadius: '10px', padding: '20px' }}>
                        <div className='flex-container'>
                            <div className='text-left w-100 m-1'>
                                <h2 style={{ fontsize: '25px' }}>Items</h2>
                                <hr />
                                {order.orderItems.map(item => {
                                    return <div>
                                        <h1>{item.name} [{item.varient}] * {item.quantity} = {item.price}</h1>
                                    </div>
                                })}
                            </div>

                            <div className='text-left w-100 m-1'>
                                <h2 style={{ fontsize: '25px' }}>Address</h2>
                                <hr />
                                <h1>Street : {order.shippingAddress.street}</h1>
                                <h1>City : {order.shippingAddress.city}</h1>
                                <h1>Country : {order.shippingAddress.country}</h1>
                                <h1>Pincode : {order.shippingAddress.pincode}</h1>
                            </div>

                            <div className='text-left w-100 m-1'>
                                <h2 style={{ fontsize: '25px' }}>Order Info</h2>
                                <hr />
                                <h1>Order Ammount : {order.orderAmount}</h1>
                                <h1>Data : {order.createdAt.substring(0, 10)}</h1>
                                <h1>transaction Id : {order.transactionId}</h1>
                                <h1>User Id : {order._id}</h1>
                            </div>
                        </div>


                    </div>
                })}
            </div>

        </div>
    )
}
