// CsoonpizzasScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCsoonpizzas,deleteCsoonpizza } from '../actions/csoonpizzaActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import './CsoonpizzasScreen.css';


export default function CsoonpizzasScreen() {
    const dispatch = useDispatch();

    const csoonpizzasstate = useSelector((state) => state.getAllCsoonpizzasReducer);
    const { csoonpizzas, error, loading } = csoonpizzasstate;

    useEffect(() => {
        dispatch(getAllCsoonpizzas());
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
            <h2 className="section-title">Coming Soon Pizza List</h2>
            {loading && <Loading />}
            {error && <Error error='Something went wrong' />}

            <table className='table table-bordered mt-4 csoonpizzas-table'>
                <thead className='thead-dark'>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {csoonpizzas && csoonpizzas.map(csoonpizza => (
                        <tr key={csoonpizza.idpizza}>
                            <td>{csoonpizza.idpizza}</td>
                            <td>{csoonpizza.name}</td>
                            <td>{csoonpizza.type}</td>
                            <td>
                                <i className='fa fa-trash m-1' onClick={() => (dispatch(deleteCsoonpizza(csoonpizza._id)))}></i>
                                <Link to={`/admin/editcsoonpizza/${csoonpizza._id}`}><i className='fa fa-edit m-1'></i></Link> </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to="/admin/addcsoonpizza" className="btn btn-primary add-button">
                Add New Cooming Soon Pizza
            </Link>
        </div>
    );
}
