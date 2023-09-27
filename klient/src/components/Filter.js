import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterPizzas } from '../actions/pizzaActions'

export default function Filter() {
    const dispatch = useDispatch()
    const [searchkey, setsearchkey] = useState('')
    const [category, setcategorykey] = useState('all')
    return (
        <div className=' shadow-lg p-3 mb-5 bg-white rounded'>

            <div className='row justify-content-center d-flex flex-row '>

                <div
                    onChange={(e) => (setsearchkey(e.target.value))}
                    value={searchkey}
                    className='col-md-2 w-100 '>
                    <input type="text" className='form-control' placeholder='search pizzas' />
                </div>
                <div className='col-md-2 w-100'>
                    <select className='form-control'
                        onChange={(e) => (setcategorykey(e.target.value))}
                        value={category}>
                        <option value="all">All</option>
                        <option value="veg">Veg</option>
                        <option value="nonveg">Non Veg</option>
                    </select>
                </div>
                <div className='col-md-2 w-100'>
                    <button className='btn' onClick={() => (dispatch(filterPizzas(searchkey, category)))}>Filter</button>
                </div>
            </div>

        </div>
    )
}


