import axios from "axios";

// get all profs
export const getAllOffers= () => async dispatch => {

    dispatch({ type: 'GET_OFFERS_REQUEST' })

    try {
        const response = await axios.get('/api/offers/getalloffers')
        console.log(response);
        dispatch({ type: 'GET_OFFERS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_OFFERS_FAILED', payload: error })
    }
}
  
// add new prof
export const addOffer = (offers) => async dispatch => {
    dispatch({ type: 'ADD_OFFER_REQUEST' })

    try {
        const response = await axios.post('/api/offers/addoffer', {offers})
         console.log(response);
        dispatch({ type: 'ADD_OFFER_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'ADD_OFFER_FAILED', payload: error });
    }
};



// get prof by id

export const getOfferById = (offerid) => async dispatch => {

    dispatch({ type: 'GET_OFFERBYID_REQUEST' })

    try {
        const response = await axios.post('/api/offers/getofferbyid', { offerid })
        console.log(response);
        dispatch({ type: 'GET_OFFERBYID_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_OFFERBYID_FAILED', payload: error })
    }
}

//edit prof

export const editOffer = (editedoffer) => async dispatch => {

    dispatch({ type: 'EDIT_OFFER_REQUEST' })
    try { 
        const response = await axios.post('/api/offers/editoffer', { editedoffer })
        console.log(response)
        dispatch({ type: 'EDIT_OFFER_SUCCESS' })
        window.location.href = '/admin/offerslist'
    } catch (error) {
        dispatch({ type: 'EDIT_OFFER_FAILED', payload: error })
    }

}

//delete prof

export const deleteOffer = (offerid) => async dispatch => {
    try {
        const response = await axios.post('/api/offers/deleteoffer', { offerid })
        alert('Offer Deleted Successfully ')
        console.log(response);
        window.location.reload()
    } catch (error) {
        alert('Something went wrong')
        console.log(error);
    }
}