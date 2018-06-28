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

export const saveSingleContact = (data) => ({
    type: SAVE_SINGLE_CONTACT,
    data
})

export const initUsers = () => (dispatch, getState) => {
    fetch("https://randomuser.me/api/?results=50")
        .then(res => res.json())
        .then(jsonUsers => {
            dispatch(fetchContacts(jsonUsers))
        })
}

export const currentContactChange = (newValue) => (dispatch, getState) => {
    const newName = getState().contactsList.clickedContact
    let changedName = () => {
        if (newValue.newFirstNameValue !== ''
        ) {
            return newValue.newFirstNameValue
        }
        else {
            return newName.name.first
        }
    }
    let changedLastName = () => {
        if (newValue.newLastNameValue !== '') {
            return newValue.newLastNameValue
        }
        else {
            return newName.name.last
        }
    }
    let changedCity = () => {
        if (newValue.newCityValue !== '') {
            return newValue.newCityValue
        }
        else {
            return newName.location.city
        }
    }
    let changedStreet = () => {
        if (newValue.newStreetValue !== '') {
            return newValue.newStreetValue
        }
        else {
            return newName.location.street
        }
    }
    let changedEmail = () => {
        if (newValue.newEmailValue !== '') {
            return newValue.newEmailValue
        }
        else {
            return newName.email
        }
    }
    let changedPhone = () => {
        if (newValue.newPhoneValue !== '') {
            return newValue.newPhoneValue
        }
        else {
            return newName.phone
        }
    }

    const newNameChanged = {
        ...newName,
        name: {...newName.name, first: changedName(), last: changedLastName()},
        location: {...newName.location, city: changedCity(), street: changedStreet()},
        email: changedEmail(),
        phone: changedPhone(),

    }
    dispatch(saveSingleContact(newNameChanged))
}

const initialState = {
    fullList: {},
    clickedContact: {},
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
            let fullListArray = state.fullList
            const changedContact = action.data
            return {
                ...state,
                fullList: [...fullListArray.map((user, i) => {
                    if (user.userKey === changedContact.userKey) {
                        return (
                            changedContact
                        )
                    } else if (user.userKey !== changedContact.userKey) {
                        return user
                    }
                })],
            }

        default:
            return state
    }
}