import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { getAllOffers } from '../actions/offerActions';
import { Link } from 'react-router-dom';
import './OfferScreen.css';
import pizzaBackgroundVideo from './pizza.mp4'; // Adjust the path to the actual location of your video file

export default function OffersScreen() {
    const dispatch = useDispatch();

    const offersstate = useSelector((state) => state.getAllOffersReducer);

    const { offers, error, loading } = offersstate;

    useEffect(() => {
        dispatch(getAllOffers());
    }, []);

    return (
        <div className="container offers-screen">
            <div className="newspaper-container">
                {/* First newspaper illustration */}
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="newspaper-illustration">
                    {/* Newspaper background */}
                    <rect x="0" y="0" width="200" height="200" fill="#f5f5f5" />

                    {/* Headline text */}
                    <text x="20" y="40" font-size="16" font-weight="bold" fill="#333">
                        Breaking News!
                    </text>

                    {/* Newspaper content */}
                    <text x="20" y="70" font-size="14" fill="#555">
                    Discover pizza perfection </text>
                    <text x="20" y="90" font-size="14" fill="#555">
                    with our exclusive offers!</text>
                </svg>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="newspaper-illustration">
                    {/* Newspaper background */}
                    <rect x="0" y="0" width="200" height="200" fill="#f5f5f5" />

                    {/* Headline text */}
                    <text x="20" y="40" font-size="16" font-weight="bold" fill="#333">
                        Breaking News!
                    </text>

                    {/* Newspaper content */}
                    <text x="20" y="70" font-size="14" fill="#555">
                    Discover pizza perfection </text>
                    <text x="20" y="90" font-size="14" fill="#555">
                    with our exclusive offers!</text>
                </svg>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="newspaper-illustration">
                    {/* Newspaper background */}
                    <rect x="0" y="0" width="200" height="200" fill="#f5f5f5" />

                    {/* Headline text */}
                    <text x="20" y="40" font-size="16" font-weight="bold" fill="#333">
                        Breaking News!
                    </text>

                    {/* Newspaper content */}
                    <text x="20" y="70" font-size="14" fill="#555">
                    Discover pizza perfection </text>
                    <text x="20" y="90" font-size="14" fill="#555">
                    with our exclusive offers!</text>
                </svg>
                
            </div>
            <h2 className="section-title">Offers list for this month</h2>
            {loading && <Loading />}
            {error && <Error error='Something went wrong' />}

            <table className='table table-bordered mt-4 offers-table'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Code of offer</th>
                        <th>Name</th>
                        <th>Offer</th>
                    </tr>
                </thead>
                <tbody>
                    {offers && offers.map(offer => (
                        <tr key={offer.idoffer}>
                            <td>{offer.idoffer}</td>
                            <td>{offer.name}</td>
                            <td>{offer.offer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

         
        </div>
    );
}
