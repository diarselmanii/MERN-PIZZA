import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Loading from '../components/Loading';
import Error from '../components/Error';
import { deleteUser, getAllUsers } from '../actions/userActions';

export default function Userslist() {
    const userstate = useSelector((state) => state.loginUserReducer);
    const { currentUser } = userstate;
    const dispatch = useDispatch()
    const getuserstate = useSelector((state) => state.getAllUsersReducer)
    const { loading, error, users } = getuserstate

    useEffect(() => {
        dispatch(getAllUsers())
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
                            <li><Link to={'/admin/profslist'}>Offers List</Link></li>
                            <li><Link to={'/admin/addoffer'}>Add New Offer</Link></li>
                            <li><Link to={'/admin/csoonpizzaslist'}>Cooming soon Pizza List</Link></li>
                            <li><Link to={'/admin/addcsoonpizza'}>Add New Cooming soon Pizza</Link></li>
                        </ul>



                    </div>
                </div>
            </div>

            <h1>Users List</h1>
            {loading && (<Loading />)}
            {error && (<Error error='Something went wrong' />)}
            <table className='table table-bordered mt-4 csoonpizzas-table'>
            <thead className='thead'>
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user => {
                        return <tr>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <i className='fa fa-trash m-1' onClick={() => (dispatch(deleteUser(user._id)))}></i>
                                <Link to={`/admin/edituser/${user._id}`}><i className='fa fa-edit m-1'></i></Link> </td>
                         </tr>
                    })}
                </tbody>
            </table>
            <Link to="/register" className="btn btn-primary add-button">
                Add New User
            </Link>
        </div>
    )
}