import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading';
import Pizza from '../components/Pizza'
import Error from '../components/Error';
import { deleteOffer, getAllOffers} from '../actions/offerActions';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import './OfferScreen.css';




export default function Offerslist() {
    const dispatch = useDispatch();

    const offersstate = useSelector((state) => state.getAllOffersReducer);

    const { offers, error, loading } = offersstate;

    useEffect(() => {
        dispatch(getAllOffers())
    }, []);

    return (
        <div className="row justify-content-center">
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
            <div className="newspaper-container2">
                {/* First newspaper illustration */}
               
               
                </div>
                <h2 className="section-title">Offers list</h2>
            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}

            <table className='table table-bordered mt-4 offers-table'>
            <thead className='thead-dark'>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Offer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {offers && offers.map(offers => {
                        return <tr>
                            <td>{offers.idoffer}</td>
                            <td>{offers.name}</td>
                            <td>{offers.offer}</td>
                            <td>
                                <i className='fa fa-trash m-1' onClick={() => (dispatch(deleteOffer(offers._id)))}></i>
                                <Link to={`/admin/editoffer/${offers._id}`}><i className='fa fa-edit m-1'></i></Link> </td>
                        </tr>

                    })}</tbody>
            </table>
            <Link to="/admin/addoffer" className="btn btn-primary add-button">
                Add New Offer
            </Link>
        </div>
    )
}
