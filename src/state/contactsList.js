const FETCH_USERS = 'contactsList/FETCH_USERS'
const PASS_CLICKED_CONTACT = 'contactsList/PASS_CLICKED_CONTACT'
const SAVE_SINGLE_CONTACT = 'contactsList/SAVE_SINGLE_CONTACT'
const CURRENT_CONTACT_CHANGE_NAME = 'contactsList/CURRENT_CONTACT_CHANGE_NAME'


export const fetchContacts = (jsonUsers) => ({
    type: FETCH_USERS,
    jsonUsers
})

export const passClickedContact = (valueOfTheClickedContact) => ({
    type: PASS_CLICKED_CONTACT,
    valueOfTheClickedContact
})
export const saveSingleContact = () => ({
    type: SAVE_SINGLE_CONTACT
})

export const initUsers = () => (dispatch, getState) => {
    fetch("https://randomuser.me/api/?results=10")
        .then(res => res.json())
        .then(jsonUsers => {
            dispatch(fetchContacts(jsonUsers))
        })
}

export const currentContactChangeName = (newFirstNameValue) => ({
    type: CURRENT_CONTACT_CHANGE_NAME,
    newFirstNameValue
})

const initialState = {
    fullList: {},
    clickedContact: {},
    currentContactData: {},

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


        case CURRENT_CONTACT_CHANGE_NAME:
            const newName = state.clickedContact
            const changed = action.newFirstNameValue
            const newNameChanged = {
                ...newName,
                name: {...newName.name, first: changed}
            }
            return {
                ...state,
                currentContactData: newNameChanged,
            }


        case SAVE_SINGLE_CONTACT:
            let fullListArray = state.fullList
            const changedContact = state.currentContactData
            return {
                ...state,
                fullList: [...fullListArray.map((user, i) => {
                    if (user.userKey === changedContact.userKey) {
                        return (
                           changedContact
                    )
                    } else if(user.userKey !== changedContact.userKey){
                        return user
                    }
                })],
                currentContactData: {},
                clickedContact: {}
            }

        default:
            return state
    }
}