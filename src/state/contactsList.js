import _ from 'lodash';

const FETCH_USERS = 'contactsList/FETCH_USERS'
const CHANGE_ORDER_OF_CONTACTS = 'contactsList/CHANGE_ORDER_OF_CONTACTS'

export const fetchContacts = (jsonUsers) => ({
    type: FETCH_USERS,
    jsonUsers
})

export const changeOrderOfContacts = (contacts) => ({
    type: CHANGE_ORDER_OF_CONTACTS,
    contacts
})

export const initUsers = () => (dispatch, getState) => {
    fetch("https://randomuser.me/api/?results=5000")
        .then(res => res.json())
        .then(jsonUsers => {
            dispatch(fetchContacts(jsonUsers))
        })
}

export const sortByAZ = (sortBy) => (dispatch, getState) => {
    let currentState = getState().contactsList.contacts
    let toBeNewState = _.orderBy(currentState, [`${sortBy}`], ['asc', 'desc'])
    return dispatch(changeOrderOfContacts(toBeNewState))
}
export const sortByZA = (sortBy) => (dispatch, getState) => {
    let currentState = getState().contactsList.contacts
    let toBeNewState = _.orderBy(currentState, [`${sortBy}`], ['desc', 'asc'])
    return dispatch(changeOrderOfContacts(toBeNewState))
}

export const selectedValueName = () => (dispatch, getState) => {
    const selectWithName = document.getElementById('selectWithName').value
    if (selectWithName === 'sortByNameAZ') {
        dispatch(sortByAZ('name.first'))
    }
    if (selectWithName === 'sortByNameZA') {
        dispatch(sortByZA('name.first'))
    }

}
export const selectedValueLastName = () => (dispatch, getState) => {
    const selectWithLastName = document.getElementById('selectWithLastName').value

    if (selectWithLastName === 'sortByLastNameAZ') {
        dispatch(sortByAZ('name.last'))
    }
    else {
        dispatch(sortByZA('name.last'))
    }

}
export const selectedValueCity = () => (dispatch, getState) => {
    const selectWithCity = document.getElementById('selectWithCity').value
    if (selectWithCity === 'sortByCityAZ') {
        dispatch(sortByAZ('location.city'))
    }
    else {
        dispatch(sortByZA('location.city'))
    }
}

const initialState = {
    contacts: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS:
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

