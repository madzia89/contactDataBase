const CURRENT_CONTACT_INFO = 'singleContactChange/CURRENT_CONTACT_INFO'
const CURRENT_CONTACT_CHANGE_NAME = 'singleContactChange/CURRENT_CONTACT_CHANGE_NAME'

export const currentContactInfo = (currentContactValue) => ({
    type: CURRENT_CONTACT_INFO,
    currentContactValue
})
export const currentContactChangeName = (newFirstNameValue) => ({
    type: CURRENT_CONTACT_CHANGE_NAME,
    newFirstNameValue
})

export const getCurrentContactValue = () => (dispatch, getState) => {
    const state = getState().contactsList.clickedContact
    dispatch(currentContactInfo(state))
}

const initialState = {
    currentContactData: {},
}

export default (state = initialState, action) => {
    switch (action.type) {

        case CURRENT_CONTACT_INFO:
            return {
                ...state,
                currentContactData: action.currentContactValue
            }

        case CURRENT_CONTACT_CHANGE_NAME:
            const newName = state.currentContactData
            const changed = action.newFirstNameValue
            const newNameChanged = {
                ...newName,
                name: {...newName.name, first: changed}
            }
            return {
                ...state,
                currentContactData: newNameChanged
            }

        default:
            return state
    }
}