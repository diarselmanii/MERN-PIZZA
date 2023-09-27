import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes, useParams, Link } from 'react-router-dom'
import { editOffer, getOfferById } from '../actions/offerActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success'
   

export default function EditOffer() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const { offerid } = useParams();
    const dispatch = useDispatch()
    const [idoffer, setidoffer] = useState('')
    const [name, setname] = useState('')
    const [offer, setoffer] = useState('')


    const getofferbyidstate = useSelector((state) => state.getOfferByIdReducer);
    const { offers, error, loading } = getofferbyidstate
    const editofferstate = useSelector((state) => state.editOfferReducer)
    const { editloading, editerror, editsuccess } = editofferstate;


    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = '/'
        } if (offers) {
            if (offers._id == offerid) {
                setidoffer(offers.idoffer)
                setname(offers.name)
                setoffer(offers.offer)
            }
            else {
                dispatch(getOfferById(offerid))
            }
        }
        else {
            dispatch(getOfferById(offerid))
        }
    }, [offers, dispatch])

    function formHandler(e) {
        e.preventDefault();

        const editedoffer = {
            _id: offerid,
           idoffer,
            name,
            offer

        }
        dispatch(editOffer(editedoffer))

    }

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
                            <li><Link to={'/admin/oferslist'}>Offers List</Link></li>
                            <li><Link to={'/admin/addoffer'}>Add New Offer</Link></li>
                            <li><Link to={'/admin/csoonpizzaslist'}>Cooming soon Pizza List</Link></li>
                            <li><Link to={'/admin/addcsoonpizza'}>Add New Cooming soon Pizza</Link></li>
                        </ul>



                    </div>
                </div>
            </div>

            <div className='text-left'>

                <h1>Edit Offer</h1>
                <h1>Offer id :{offerid}</h1>

                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {editsuccess && (<Success success='Class details edited successffully' />)}
                {editloading && (<Loading />)}

                <form onSubmit={formHandler}>
                    <input className='form-control' type="text" placeholder='id offer' value={idoffer} onChange={(e) => { setidoffer(e.target.value) }} />
                   <input className='form-control' type="text" placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />
                   <input className='form-control' type="text" placeholder='offer' value={offer} onChange={(e) => { setoffer(e.target.value) }} />
                
                  <button className='btn mt-3' type='submit'>Edit Offer</button>
                </form>
            </div>
        </div>


    )
}

