const FETCH_USERS = 'contactsList/FETCH_USERS'
const PASS_CLICKED_CONTACT = 'contactsList/PASS_CLICKED_CONTACT'
const SAVE_SINGLE_CONTACT = 'contactsList/SAVE_SINGLE_CONTACT'

export const fetchContacts = (jsonUsers) => ({
    type: FETCH_USERS,
    jsonUsers
})

export const passClickedContact = (valueOfTheClickedContact) => ({
    type: PASS_CLICKED_CONTACT,
    valueOfTheClickedContact
})
export const saveSingleContact = (valueOfTheChangedContact) => ({
    type: SAVE_SINGLE_CONTACT,
    valueOfTheChangedContact
})

export const initUsers = () => (dispatch, getState) => {
    fetch("https://randomuser.me/api/?results=100")
        .then(res => res.json())
        .then(jsonUsers => {
            dispatch(fetchContacts(jsonUsers))
        })
}

export const singleContactConfirmChanges = () => (dispatch, getState) => {
    const stateFromSingleContactChange = getState().singleContactChange.currentContactData
    dispatch(saveSingleContact(stateFromSingleContactChange))
}

const initialState = {
    fullList: {},
    clickedContact: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
            const users = action.jsonUsers
            const myContacts = users.results.map((user, i) => {
                return {
                    ...user,
                    userKey: user.userKey = i
                }
            })
            return {
                ...state,
                fullList: myContacts,
            }

        case PASS_CLICKED_CONTACT:
            return {
                ...state,
                clickedContact: action.valueOfTheClickedContact
            }


        case SAVE_SINGLE_CONTACT:
            const fullListArray = state.fullList
            const changedContact = action.valueOfTheChangedContact
            const findTheObjectToChange = fullListArray.findIndex(contact => contact.userKey === changedContact.userKey)
            fullListArray[findTheObjectToChange] = changedContact
            return {
                ...state,
                fullList: fullListArray,
            }

        default:
            return state
    }
}