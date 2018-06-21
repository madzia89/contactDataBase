import _ from 'lodash'

const FETCH_USERS = 'contactsList/FETCH_USERS'
const CHANGE_ORDER_OF_CONTACTS = 'contactsList/CHANGE_ORDER_OF_CONTACTS'
const CHANGE_STATE_FOR_INPUT = 'contactsList/STATE_FOR_INPUT'
const CHANGE_STATE_FOR_ADVANCED_SEARCH_INPUT = 'contactsList/CHANGE_STATE_FOR_ADVANCED_SEARCH_INPUT'
const CLEAR_FORM_FIELDS = 'contactsList/CLEAR_FORM_FIELDS'
const CLICKED_CONTACT = 'contactsList/CLICKED_CONTACT'
const SAVE_SINGLE_CONTACT = 'contactsList/SAVE_SINGLE_CONTACT'

export const fetchContacts = (jsonUsers) => ({
    type: FETCH_USERS,
    jsonUsers
})

export const changeOrderOfContacts = (contacts) => ({
    type: CHANGE_ORDER_OF_CONTACTS,
    contacts
})

export const changeStateForInput = (lettersForBasicSearchInput) => ({
    type: CHANGE_STATE_FOR_INPUT,
    lettersForBasicSearchInput
})

export const changeStateForAdvancedInput = (lettersForAdvancedSearchInput) => ({
    type: CHANGE_STATE_FOR_ADVANCED_SEARCH_INPUT,
    lettersForAdvancedSearchInput
})

export const clearFormFields = () => ({type: CLEAR_FORM_FIELDS})

export const clickedContact = (valueOfTheClickedContact) => ({
    type: CLICKED_CONTACT,
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

export const selectCategory = () => (dispatch, getState) => {
    let optionsForSecondSelect = {}
    optionsForSecondSelect['name.first'] = ['', 'AZ', 'ZA']
    optionsForSecondSelect['name.last'] = ['', 'AZ', 'ZA']
    optionsForSecondSelect['location.city'] = ['', 'AZ', 'ZA']

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
                return secondSelector.options.add(createdOption)
            }
        )
    }
}

export const sortContacts = () => (dispatch, getState) => {
    let currentState = getState().contactsList.contacts
    const pickedValueFromCategorySelect = document.getElementById('selectWithCategories').value
    const pickedValueFromSecondSelect = document.getElementById('secondSelect').value

    if (pickedValueFromSecondSelect === '1') {
        let toBeNewState = _.orderBy(currentState, [`${pickedValueFromCategorySelect}`], ['asc', 'desc'])
        return dispatch(changeOrderOfContacts(toBeNewState))
    } else if (pickedValueFromSecondSelect === '2') {
        let toBeNewState = _.orderBy(currentState, [`${pickedValueFromCategorySelect}`], ['desc', 'asc'])
        return dispatch(changeOrderOfContacts(toBeNewState))
    } else return
}

export const singleContactConfirmChanges = () => (dispatch, getState) => {
    const stateFromSingleContactChange = getState().singleContactChange.currentContactData
    dispatch(saveSingleContact(stateFromSingleContactChange))
}

const initialState = {
    fullList: {},
    contacts: {},
    stateForSearchInput: '',
    stateForAdvancedSearchInput: '',
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
                contacts: myContacts,
                fullList: myContacts,
            }

        case CHANGE_ORDER_OF_CONTACTS:
            return {
                ...state,
                contacts: action.contacts,
            }

        case CLEAR_FORM_FIELDS:
            const fullList = state.fullList
            return {
                ...state,
                stateForSearchInput: '',
                stateForAdvancedSearchInput: '',
                contacts: fullList,
            }

        case CHANGE_STATE_FOR_INPUT:
            const actualContacts = state.fullList
            const selectWithCategories = document.getElementById('selectWithCategories').value
            const advancedSearchInput = document.getElementById('advancedSearchListInput')

            if (action.lettersForBasicSearchInput === '') {
                advancedSearchInput.className = 'thisInputIsInvisible'
            }
            else {
                advancedSearchInput.className = 'thisInputIsVisible'

            }
            const filteredList = actualContacts.filter(name => {
                if (selectWithCategories === 'name.first') {
                    return (
                        name.name.first.includes(action.lettersForBasicSearchInput))
                }
                else if (selectWithCategories === 'name.last') {
                    return (
                        name.name.last.includes(action.lettersForBasicSearchInput))
                }
                else if (selectWithCategories === 'location.city') {
                    return (
                        name.location.city.includes(action.lettersForBasicSearchInput))
                }
                else {
                    return (
                        name.name.first.includes(action.lettersForBasicSearchInput) ||
                        name.name.last.includes(action.lettersForBasicSearchInput) ||
                        name.location.city.includes(action.lettersForBasicSearchInput) ||
                        name.email.includes(action.lettersForBasicSearchInput) || !name
                    )
                }
            })
            return {
                ...state,
                stateForSearchInput: action.lettersForBasicSearchInput,
                contacts: filteredList
            }

        case CHANGE_STATE_FOR_ADVANCED_SEARCH_INPUT:
            return {
                ...state,
                stateForAdvancedSearchInput: action.lettersForAdvancedSearchInput
            }
        case CLICKED_CONTACT:
            return {
                ...state,
                clickedContact: action.valueOfTheClickedContact
            }
        case SAVE_SINGLE_CONTACT:
            const fullListArray = state.fullList
            const changedContact = action.valueOfTheChangedContact
            const findTheObjectToChange = fullListArray.findIndex(contact => contact.userKey === changedContact.userKey)
            fullListArray[findTheObjectToChange] = changedContact
            console.log(fullListArray)
            return {
                ...state,
                fullList: fullListArray,
                contacts: fullListArray
            }

        default:
            return state
    }
}