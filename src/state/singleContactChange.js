const CURRENT_CONTACT_INFO = 'singleContactChange/CURRENT_CONTACT_INFO'

export const currentContactInfo = (currentContactValue) => ({
    type: CURRENT_CONTACT_INFO,
    currentContactValue
})

export const getCurrentContactValue = () => (dispatch, getState) => {
    const state = getState().contactsList.clickedContact
    dispatch(currentContactInfo(state))
}
const initialState = {
    currentContactData: {}
}

export default (state = initialState, action) => {
    switch (action.type) {

        case CURRENT_CONTACT_INFO:
            return {
                ...state,
                currentContactData: action.currentContactValue
            }

        default:
            return state
    }
}