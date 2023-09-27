import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCsoonpizzas } from '../actions/csoonpizzaActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Link } from 'react-router-dom';
import './CsoonpizzasScreen.css';

export default function CsoonpizzasScreen() {
    const dispatch = useDispatch();
    const tableRef = useRef();

    const csoonpizzasstate = useSelector((state) => state.getAllCsoonpizzasReducer);
    const { csoonpizzas, error, loading } = csoonpizzasstate;

    useEffect(() => {
        dispatch(getAllCsoonpizzas());
    }, []);

    useEffect(() => {
        if (csoonpizzas.length > 0) {
            tableRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [csoonpizzas]);

    return (
        <div className="container csoonpizzas-screen">
            <div className="pizza-container">
               {/* First pizza illustration */}
               <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="pizza-illustration">
                    <circle cx="100" cy="100" r="90" fill="#fa983a" />
                    <circle cx="100" cy="100" r="70" fill="#fcf876" />
                    <circle cx="100" cy="100" r="60" fill="#eb2f06" />
                    <circle cx="100" cy="100" r="50" fill="#1e3799" />
                </svg>

                {/* Second pizza illustration */}
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="pizza-illustration">
                    <circle cx="100" cy="100" r="90" fill="#c44569" />
                    <circle cx="100" cy="100" r="70" fill="#2c3e50" />
                    <circle cx="100" cy="100" r="60" fill="#3498db" />
                    <circle cx="100" cy="100" r="50" fill="#e74c3c" />
                </svg>

                {/* Third pizza illustration */}
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="pizza-illustration">
                    <circle cx="100" cy="100" r="90" fill="#009432" />
                    <circle cx="100" cy="100" r="70" fill="#ffdd59" />
                    <circle cx="100" cy="100" r="60" fill="#44bd32" />
                    <circle cx="100" cy="100" r="50" fill="#9b59b6" />
                </svg>
            </div>
            <h2 className="section-title">Coming Soon Pizza List</h2>
            {loading && <Loading />}
            {error && <Error error='Something went wrong' />}

            <div ref={tableRef}>
                <table className='table table-bordered mt-4 csoonpizzas-table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {csoonpizzas && csoonpizzas.map(csoonpizza => (
                            <tr key={csoonpizza.idpizza}>
                                <td>{csoonpizza.idpizza}</td>
                                <td>{csoonpizza.name}</td>
                                <td>{csoonpizza.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
