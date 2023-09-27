


// get all classes Reducer
export const getAllCsoonpizzasReducer = (state = { csoonpizzas: [] }, action) => {

    switch (action.type) {
        case 'GET_CSOONPIZZAS_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_CSOONPIZZAS_SUCCESS': return {
            loading: false,
            csoonpizzas: action.payload
        }
        case 'GET_CSOONPIZZAS_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}
// add new class Reducer
export const addCsoonpizzaReducer = (state = {}, action) => {

    switch (action.type) {
        case 'ADD_CSOONPIZZA_REQUEST': return {
            loading: true,
            ...state
        }
        case 'ADD_CSOONPIZZA_SUCCESS': return {
            loading: false,
            success: true,
        }
        case 'ADD_CSOONPIZZA_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}
// get class by id Reducer
export const getCsoonpizzaByIdReducer = (state = {}, action) => {

    switch (action.type) {
        case 'GET_CSOONPIZZABYID_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_CSOONPIZZABYID_SUCCESS': return {
            loading: false,
            csoonpizzas: action.payload
        }
        case 'GET_CSOONPIZZABYID_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}
//edit class Reducer 
export const editCsoonpizzaReducer = (state = {}, action) => {

    switch (action.type) {
        case 'EDIT_CSOONPIZZA_REQUEST': return {
            editloading: true,
            ...state
        }
        case 'EDIT_CSOONPIZZA_SUCCESS': return {
            editloading: false,
            editsuccess: true,
        }
        case 'EDIT_CSOONPIZZA_FAILED': return {
            editerror: action.payload,
            editloading: false
        }
        default: return state
    }

}

//delete class Reducer