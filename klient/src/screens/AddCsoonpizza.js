import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { addCsoonpizza } from '../actions/csoonpizzaActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success'

export default function AddCsoonpizza() {
    const [idpizza, setidpizza] = useState('')
    const [name, setname] = useState('')
    const [type, settype] = useState('')
  

    const addcsoonpizzastate = useSelector((state) => state.addCsoonpizzaReducer);
    const { success, error, loading } = addcsoonpizzastate


    function formHandler(e) {
        e.preventDefault();

        const csoonpizza = {
            idpizza,
            name,
            type
        }
        console.log(csoonpizza);
        dispatch(addCsoonpizza(csoonpizza));
    }


    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const dispatch = useDispatch()




    useEffect(() => {
        if (!currentUser || !currentUser.isAdmin) {
            window.location.href = '/';
        }
    }, [])
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
                            <li><Link to={'/admin/csoonpizzaslist'}>Cooming soon Pizza List</Link></li>
                            <li><Link to={'/admin/addcsoonpizza'}>Add New Cooming soon Pizza</Link></li>
                        </ul>



                    </div>
                </div>
            </div>

            <div className='text-left'>

                <h2>Add Cooming soon Pizza</h2>

                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {success && (<Success success='New cooming soon Pizza added successfully' />)}

                <form onSubmit={formHandler}>
                    <input className='form-control' type="text" placeholder='idpizza' value={idpizza} onChange={(e) => { setidpizza(e.target.value) }} />
                   <input className='form-control' type="text" placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />    
                   <input className='form-control' type="text" placeholder='type' value={type} onChange={(e) => { settype(e.target.value) }} />
                  <button className='btn mt-3' type='submit'>Add Cooming soon Pizza</button>
                </form>
            </div>
        </div>
    )
}
