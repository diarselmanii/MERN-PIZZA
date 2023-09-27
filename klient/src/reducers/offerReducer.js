export const getAllOffersReducer = (state = { offers: [] }, action) => {

    switch (action.type) {
        case 'GET_OFFERS_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_OFFERS_SUCCESS': return {
            loading: false,
            offers: action.payload
        }
        case 'GET_OFFERS_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const addOfferReducer = (state = {}, action) => {

    switch (action.type) {
        case 'ADD_OFFER_REQUEST': return {
            loading: true,
            ...state
        }
        case 'ADD_OFFER_SUCCESS': return {
            loading: false,
            success: true,
        }
        case 'ADD_OFFER_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const getOfferByIdReducer = (state = {}, action) => {

    switch (action.type) {
        case 'GET_OFFERBYID_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_OFFERBYID_SUCCESS': return {
            loading: false,
            offer: action.payload
        }
        case 'GET_OFFERBYID_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

export const editOfferReducer = (state = {}, action) => {

    switch (action.type) {
        case 'EDIT_OFFER_REQUEST': return {
            editloading: true,
            ...state
        }
        case 'EDIT_OFFER_SUCCESS': return {
            editloading: false,
            editsuccess: true,
        }
        case 'EDIT_OFFER_FAILED': return {
            editerror: action.payload,
            editloading: false
        }
        default: return state
    }

}