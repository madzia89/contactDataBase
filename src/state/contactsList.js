import _ from 'lodash'

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
    fetch("https://randomuser.me/api/?results=200")
        .then(res => res.json())
        .then(jsonUsers => {
            dispatch(fetchContacts(jsonUsers))
        })
}

export const selectCategory = () => (dispatch, getState) => {
    let optionsForSecondSelect = {}
    optionsForSecondSelect['name.first'] = ['', 'nameAZ', 'nameZA']
    optionsForSecondSelect['name.last'] = ['', 'lastNameAZ', 'lastNameZA']
    optionsForSecondSelect['location.city'] = ['', 'cityAZ', 'cityZA']

    const selectorWithCategories = document.getElementById('selectWithCategories')
    const secondSelector = document.getElementById('secondSelect')
    let selectedOption = selectorWithCategories.options[selectorWithCategories.selectedIndex].value
    while (secondSelector.options.length) {
        secondSelector.remove(0)
    }
    let selectors = optionsForSecondSelect[selectedOption]
    if (selectors) {
        selectors.map((selector, i) => {
                let createdOption = new Option(selectors[i], i)
                secondSelector.options.add(createdOption)
            }
        )
    }
}

export const sortContacts = () => (dispatch, getState) => {
    let currentState = getState().contactsList.contacts
    const pickedValueFromCategorySelect = document.getElementById('selectWithCategories').value
    const pickedValueFromSecondSelect = document.getElementById('secondSelect').value
    console.log('pickedValueFromCategorySelect', pickedValueFromCategorySelect)
    console.log('pickedValueFromSecondSelect', pickedValueFromSecondSelect)
    if (pickedValueFromSecondSelect == 1) {
        let toBeNewState = _.orderBy(currentState, [`${pickedValueFromCategorySelect}`], ['asc', 'desc'])
        return dispatch(changeOrderOfContacts(toBeNewState))
    } else if (pickedValueFromSecondSelect == 2) {
        let toBeNewState = _.orderBy(currentState, [`${pickedValueFromCategorySelect}`], ['desc', 'asc'])
        return dispatch(changeOrderOfContacts(toBeNewState))
    } else return
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

