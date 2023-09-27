import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes, useParams, Link } from 'react-router-dom'
import { editPizza, getPizzaById } from '../actions/pizzaActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success'



export default function Editpizza() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const { pizzaid } = useParams();
    const dispatch = useDispatch()
    const [name, setname] = useState('')

    const [smallprice, setsmallprice] = useState('')

    const [mediumprice, setmediumprice] = useState('')

    const [largeprice, setlargeprice] = useState('')

    const [image, setimage] = useState('')

    const [description, setdescription] = useState('')

    const [category, setcategory] = useState('')

    const getpizzabyidstate = useSelector((state) => state.getPizzaByIdReducer);
    const { pizza, error, loading } = getpizzabyidstate
    const editpizzastate = useSelector((state) => state.editPizzaReducer)
    const { editloading, editerror, editsuccess } = editpizzastate;


    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = '/'
        } if (pizza) {
            if (pizza._id == pizzaid) {
                setname(pizza.name)
                setdescription(pizza.description)
                setcategory(pizza.category)
                setsmallprice(pizza.prices[0]['small'])
                setmediumprice(pizza.prices[0]['medium'])
                setlargeprice(pizza.prices[0]['large'])
                setimage(pizza.image)
            }
            else {
                dispatch(getPizzaById(pizzaid))
            }
        }
        else {
            dispatch(getPizzaById(pizzaid))
        }
    }, [pizza, dispatch])

    function formHandler(e) {
        e.preventDefault();

        const editedpizza = {
            _id: pizzaid,
            name,
            image,
            description,
            category,
            prices: {
                small: smallprice,
                medium: mediumprice,
                large: largeprice
            }
        }
        dispatch(editPizza(editedpizza))

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

                <h1>Edit Pizza</h1>
                <h1>Pizza id :{pizzaid}</h1>

                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {editsuccess && (<Success success='Pizza details edited successffully' />)}
                {editloading && (<Loading />)}

                <form onSubmit={formHandler}>
                    <input className='form-control' type="text" placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />
                    <input className='form-control' type="text" placeholder='small varient price' value={smallprice} onChange={(e) => { setsmallprice(e.target.value) }} />
                    <input className='form-control' type="text" placeholder='medium varient price' value={mediumprice} onChange={(e) => { setmediumprice(e.target.value) }} />
                    <input className='form-control' type="text" placeholder='large varient price' value={largeprice} onChange={(e) => { setlargeprice(e.target.value) }} />
                    <input className='form-control' type="text" placeholder='category' value={category} onChange={(e) => { setcategory(e.target.value) }} />
                    <input className='form-control' type="text" placeholder='description' value={description} onChange={(e) => { setdescription(e.target.value) }} />
                    <input className='form-control' type="text" placeholder='image' value={image} onChange={(e) => { setimage(e.target.value) }} />
                    <button className='btn mt-3' type='submit'>Edit Pizza</button>
                </form>
            </div>
        </div>


    )
}

