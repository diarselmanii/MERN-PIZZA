import axios from "axios";

// get all classes
export const getAllCsoonpizzas = () => async dispatch => {

    dispatch({ type: 'GET_CSOONPIZZAS_REQUEST' })

    try {
        const response = await axios.get('/api/csoonpizzas/getallcsoonpizzas')
        console.log(response);
        dispatch({ type: 'GET_CSOONPIZZAS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_CSOONPIZZAS_FAILED', payload: error })
    }
}

// add new class 
export const addCsoonpizza = (csoonpizza) => async dispatch => {

    dispatch({ type: 'ADD_CSOONPIZZA_REQUEST' })
    try {
        const response = await axios.post('/api/csoonpizzas/addcsoonpizza', { csoonpizza })
        console.log(response)
        dispatch({ type: 'ADD_CSOONPIZZA_SUCCESS' })
    } catch (error) {
        dispatch({ type: 'ADD_CSOONPIZZA_FAILED', payload: error })
    }

}

// get class by id

export const getCsoonpizzaById = (csoonpizzaid) => async dispatch => {

    dispatch({ type: 'GET_CSOONPIZZABYID_REQUEST' })

    try {
        const response = await axios.post('/api/csoonpizzas/getcsoonpizzabyid', { csoonpizzaid })
        console.log(response);
        dispatch({ type: 'GET_CSOONPIZZABYID_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_CSOONPIZZABYID_FAILED', payload: error })
    }
}

//edit class

export const editCsoonpizza = (editedcsoonpizza) => async dispatch => {

    dispatch({ type: 'EDIT_CSOONPIZZA_REQUEST' })
    try {
        const response = await axios.post('/api/csoonpizzas/editcsoonpizza', { editedcsoonpizza })
        console.log(response)
        dispatch({ type: 'EDIT_CSOONPIZZA_SUCCESS' })
        window.location.href = '/admin/csoonpizzaslist'
    } catch (error) {
        dispatch({ type: 'EDIT_CSOONPIZZA_FAILED', payload: error })
    }

}

//delete class

export const deleteCsoonpizza = (csoonpizzaid) => async dispatch => {
    try {
        const response = await axios.post('/api/csoonpizzas/deletecsoonpizza', { csoonpizzaid })
        alert('Cooming soon pizza Deleted Successfully ')
        console.log(response);
        window.location.reload()
    } catch (error) {
        alert('Something went wrong')
        console.log(error);
    }
}