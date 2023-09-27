import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading';
import Pizza from '../components/Pizza'
import Error from '../components/Error';
import { deletePizza, getAllPizzas } from '../actions/pizzaActions';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'




export default function Pizzaslist() {
    const dispatch = useDispatch();

    const pizzasstate = useSelector((state) => state.getAllPizzasReducer);

    const { pizzas, error, loading } = pizzasstate;

    useEffect(() => {
        dispatch(getAllPizzas())
    }, []);

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
                            <li><Link to={'/admin/profslist'}>Offers List</Link></li>
                            <li><Link to={'/admin/addoffer'}>Add New Offer</Link></li>
                            <li><Link to={'/admin/csoonpizzaslist'}>Cooming soon Pizza List</Link></li>
                            <li><Link to={'/admin/addcsoonpizza'}>Add New Cooming soon Pizza</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <h2>Pizzas list</h2>
            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}

            <table className='table table-bordered mt-4 csoonpizzas-table'>
                <thead className='thead'>
                    <tr>
                        <th>Name</th>
                        <th>Prices</th>
                        <th>Cateogry</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pizzas && pizzas.map(pizza => {
                        return <tr>
                            <td>{pizza.name}</td>
                            <td>
                                Small : {pizza.prices[0]['small']} <br />
                                Medium : {pizza.prices[0]['medium']} <br />
                                Large : {pizza.prices[0]['large']}

                            </td>
                            <td>{pizza.category}</td>
                            <td>
                                <i className='fa fa-trash m-1' onClick={() => (dispatch(deletePizza(pizza._id)))}></i>
                                <Link to={`/admin/editpizza/${pizza._id}`}><i className='fa fa-edit m-1'></i></Link> </td>
                        </tr>

                    })}</tbody>
            </table>
            <Link to="/admin/addpizza" className="btn btn-primary add-button">
                Add New Pizza
            </Link>
        </div>
    )
}
