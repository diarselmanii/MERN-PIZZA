import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes, useParams, Link } from 'react-router-dom'
import { editUser, getUserById } from '../actions/userActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success'
    ;

export default function EditUser() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate; 
    const { userid } = useParams();
    const dispatch = useDispatch()
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [isAdmin, setisAdmin] = useState('')


    const getusersbyidstate = useSelector((state) => state.getUserByIdReducer);
    const { useri, error, loading } = getusersbyidstate
    const editusersstate = useSelector((state) => state.editUserReducer)
    const { editloading, editerror, editsuccess } = editusersstate;
 

    useEffect(() => {
        if (!currentUser.isAdmin) {
            window.location.href = '/'
        } if (useri) {
            if (useri._id == userid) {
         
                setname(useri.name)
                setemail(useri.email)
                setpassword(useri.password)
                setisAdmin(useri.isAdmin)
            }
            else {
                dispatch(getUserById(userid))
            }
        }
        else {
            dispatch(getUserById(userid))
        }
    }, [useri, dispatch])

    function formHandler(e) {
        e.preventDefault();

        const editedtuser = {
            _id: userid,
            name,
            email,
            password,
            isAdmin

        }
        dispatch(editUser(editedtuser))

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
                            <li><Link to={'/admin/offerslist'}>Offers List</Link></li>
                            <li><Link to={'/admin/addoffer'}>Add New Offer</Link></li>
                            <li><Link to={'/admin/csoonpizzaslist'}>Cooming soon Pizza List</Link></li>
                            <li><Link to={'/admin/addcsoonpizza'}>Add New Cooming soon Pizza</Link></li>
                        </ul>



                    </div>
                </div>
            </div>

            <div className='text-left'>

                <h1>Edit User</h1>
                <h1>User id :{userid}</h1>

                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {editsuccess && (<Success success='Class details edited successffully' />)}
                {editloading && (<Loading />)}

                <form onSubmit={formHandler}>
                    <input className='form-control' type="text" placeholder='name' value={name} onChange={(e) => { setname(e.target.value) }} />
                   <input className='form-control' type="text" placeholder='email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                   <input className='form-control' type="text" placeholder='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                   <input className='form-control' type="text" placeholder='isAdmin' value={isAdmin} onChange={(e) => { setisAdmin(e.target.value) }} />

                  <button className='btn mt-3' type='submit'>Edit User</button>
                </form>
            </div>
        </div>


    )
}

