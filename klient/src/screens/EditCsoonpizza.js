import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes, useParams, Link } from 'react-router-dom'
import { editCsoonpizza, getCsoonpizzaById } from '../actions/csoonpizzaActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success'
    ;

export default function EditCsoonpizza() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const { csoonpizzaid } = useParams();
    const dispatch = useDispatch()
    const [idpizza, setidpizza] = useState('')
    const [name, setname] = useState('')
    const [type, settype] = useState('')


    const getcsoonpizzbyidstate = useSelector((state) => state.getCsoonpizzaByIdReducer);
    const { csoonpizza, error, loading } = getcsoonpizzbyidstate
    const editcsoonpizzastate = useSelector((state) => state.editCsoonpizzaReducer)
    const { editloading, editerror, editsuccess } = editcsoonpizzastate;


    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = '/'
        } if (csoonpizza) {
            if (csoonpizza._id == csoonpizzaid) {
                setidpizza(csoonpizza.idpizza)
                setname(csoonpizza.name)
                settype(csoonpizza.type)
            }
            else {
                dispatch(getCsoonpizzaById(csoonpizzaid))
            }
        }
        else {
            dispatch(getCsoonpizzaById(csoonpizzaid))
        }
    }, [csoonpizza, dispatch])

    function formHandler(e) {
        e.preventDefault();

        const editedcsoonpizza = {
            _id: csoonpizzaid,
            idpizza,
            name,
            type

        }
        dispatch(editCsoonpizza(editedcsoonpizza))

    }

    return (
        <div  className="container csoonpizzas-screen">
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

                <h1>Edit Cooming soon pizza</h1>
                <h1>Cooming soon pizza id :{csoonpizzaid}</h1>

                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {editsuccess && (<Success success='Cooming soon pizza details edited successffully' />)}
                {editloading && (<Loading />)}

                <form onSubmit={formHandler}>
                    <input className='form-control' type="text" placeholder='idpizza' value={idpizza} onChange={(e) => { setidpizza(e.target.value) }} />
                   <input className='form-control' type="text" placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />
                   <input className='form-control' type="text" placeholder='type' value={type} onChange={(e) => { settype(e.target.value) }} />
                
                  <button className='btn mt-3' type='submit'>Edit Cooming soon pizza</button>
                </form>
            </div>
        </div>


    )
}

