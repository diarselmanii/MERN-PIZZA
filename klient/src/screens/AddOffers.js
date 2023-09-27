import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addOffer } from '../actions/offerActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success';


export default function AddOffer() {
    const [idoffer, setidoffer] = useState('');
    const [name, setname] = useState('');
    const [offer, setoffer] = useState('');


    const addofferstate = useSelector((state) => state.addOfferReducer);
    const { success, error, loading } = addofferstate;

    function formHandler(e) {
        e.preventDefault();

        const offers = {
            idoffer,
            name,
            offer
        };
        console.log(offers);
        dispatch(addOffer(offers));
    }

    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const dispatch = useDispatch()

    useEffect(() => {
        if (!currentUser || !currentUser.isAdmin) {
            window.location.href = '/';
        }
    }, []);

    return (
        <div>
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
                            <li><Link to={'/admin/csoonpizzaslist'}>Coming soon Pizza List</Link></li>
                            <li><Link to={'/admin/addcsoonpizza'}>Add New Coming soon Pizza</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='text-left'>
                <h2>Add Offer</h2>
                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {success && (<Success success='New class added successfully' />)}
                <form onSubmit={formHandler}>
                    <input className='form-control' type="text" placeholder='idoffer' value={idoffer} onChange={(e) => { setidoffer(e.target.value) }} />
                   <input className='form-control' type="text" placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />    
                   <input className='form-control' type="text" placeholder='offer' value={offer} onChange={(e) => { setoffer(e.target.value) }} />
                  <button className='btn mt-3' type='submit'>Add Offer</button>
                </form>
            </div>
        </div>
    );
}
