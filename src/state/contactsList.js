import _ from 'lodash';

const FETCH_CONTACTS_SUCCESS = 'contactsList/FETCH_CONTACTS_SUCCESS'
const CHANGE_ORDER_OF_CONTACTS = 'contactsList/FETCH_USERS_SUCCESS'

export const fetchusersSuccess = (jsonUsers) => ({
    type: FETCH_CONTACTS_SUCCESS,
    jsonUsers
})
export const changeOrderOfContacts = (contacts) => ({
    type: CHANGE_ORDER_OF_CONTACTS,
    contacts
})

export const initUsers = () => (dispatch, getState) => {
    fetch("https://randomuser.me/api/?results=10")
        .then(res => res.json())
        .then(jsonUsers => {
            dispatch(fetchusersSuccess(jsonUsers))
        })
}

export const sortByAZ = (name, sortBy) => (dispatch, getState) => {
    let currentState = getState().stateForSelects.contacts
    currentState = _.orderBy(name, [`${sortBy}`], ['asc', 'desc'])
    dispatch(changeOrderOfContacts(currentState))
}
export const sortByZA = (name, sortBy) => (dispatch, getState) => {
    let currentState = getState().stateForSelects.contacts
    currentState = _.orderBy(name, [`${sortBy}`], ['desc', 'asc'])
    dispatch(changeOrderOfContacts(currentState))
}

export const selectedValue = () => (dispatch, getState) => {
    const selectWithName = document.getElementById('selectWithName').value
    const selectWithLastName = document.getElementById('selectWithLastName').value
    const selectWithCity = document.getElementById('selectWithCity').value
    const actualStateOfContacts = getState().contactsList.contacts
    if (selectWithName === 'sortByNameAZ') {
        dispatch(sortByAZ(actualStateOfContacts, 'name.first'))
    }
    if (selectWithName === 'sortByNameZA') {
        dispatch(sortByZA(actualStateOfContacts, 'name.first'))
    }
    if (selectWithLastName === 'sortByLastNameAZ') {
        dispatch(sortByAZ(actualStateOfContacts, 'name.last'))
    }
    if (selectWithLastName === 'sortByLastNameZA') {
        dispatch(sortByZA(actualStateOfContacts, 'name.last'))
    }
    if (selectWithCity === 'sortByCityAZ') {
        dispatch(sortByAZ(actualStateOfContacts, 'location.city'))
    }
    if (selectWithCity === 'sortByCityZA') {
        dispatch(sortByZA(actualStateOfContacts, 'location.city'))
    }
}


const initialState = {
    contacts: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTACTS_SUCCESS:
            const users = action.jsonUsers
            const myContacts = users.results
            return {
                ...state,
                contacts: myContacts,
            }
        case CHANGE_ORDER_OF_CONTACTS:
            return {
                ...state,
                contacts: action.contacts,
            }
        default:
            return state
    }
}

