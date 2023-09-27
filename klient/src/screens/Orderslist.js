
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../components/Loading';
import Pizza from '../components/Pizza'
import Error from '../components/Error';
import { deliverOrder, getAllOrders } from '../actions/orderActions';

export default function Orderslist() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const dispatch = useDispatch()
    const getordersstate = useSelector((state) => state.getAllOrdersReducer)
    const { loading, error, orders } = getordersstate

    useEffect(() => {
        dispatch(getAllOrders())
        if (!currentUser.isAdmin) {
            window.location.href = '/'
        }

    }, [])
    return (
        <div  className="row justify-content-center">
            <div>
                <div className='row justify-content-center'>
                    <div className='col-md-10'>
                        <h2 style={{ fontSize: '25px' }}>Admin Panel</h2>
                        <ul className='adminfunctions'>
                            <li><Link to={'/admin/userslist'}>Users List</Link></li>
                            <li><Link to={'/admin/pizzaslist'}>Pizzas List</Link></li>
                            <li><Link to={'/admin/addpizza'}>Add New Pizza</Link></li>
                            <li><Link to={'/admin/orderslist'}>Orders List</Link></li>
                            <li><Link to={'/admin/offerslist'}>Offers List</Link></li>
                            <li><Link to={'/admin/addoffer'}>Add New Offer</Link></li>
                            <li><Link to={'/admin/csoonpizzaslist'}>Cooming soon Pizza List</Link></li>
                            <li><Link to={'/admin/addcsoonpizza'}>Add New Cooming soon Pizza</Link></li>
                        </ul>



                    </div>
                </div>
            </div>
            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}

            <table className='table table-bordered mt-4 csoonpizzas-table'>
            <thead className='thead-dark'>
                    <tr>
                        <th>Order id </th>
                        <th>Email</th>
                        <th>User Id</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map(order => {
                        return <tr>
                            <td>{order._id}</td>
                            <td>{order.email}</td>
                            <td>{order.userid}</td>
                            <td>{order.orderAmount}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>
                                {order.isDelivered ? (<h1>Delivered</h1>
                                ) :
                                    (<button className='btn' onClick={() => (dispatch(deliverOrder(order._id)))}>Deliver</button>)}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    )
}
