const CHANGE_CLASS_NAME_FOR_NAME = 'stateForSelects/CLASS_NAME_FOR_NAME'
const CHANGE_CLASS_NAME_FOR_LAST_NAME = 'stateForSelects/CHANGE_CLASS_NAME_FOR_LAST_NAME'
const CHANGE_CLASS_NAME_FOR_CITY = 'stateForSelects/CLASS_NAME_FOR_CITY'


export const changeClassNameForName = (value) => ({
    type: CHANGE_CLASS_NAME_FOR_NAME,
    value
})

export const changeClassNameForLastName = (value) => ({
    type: CHANGE_CLASS_NAME_FOR_LAST_NAME,
    value
})

export const changeClassNameForCity = (value) => ({
    type: CHANGE_CLASS_NAME_FOR_CITY,
    value
})

export const selectCategory = () => (dispatch, getState) => {
    const selectorWithCategories = document.getElementById('selectWithCategories').value
    ;(selectorWithCategories === 'name') ?
        dispatch(changeClassNameForName('itIsVisible'))
        :
        dispatch(changeClassNameForName('itIsInvisible'))

    ;(selectorWithCategories === 'lastName') ?
        dispatch(changeClassNameForLastName('itIsVisible'))
        :
        dispatch(changeClassNameForLastName('itIsInvisible'))

    ;(selectorWithCategories === 'city') ?
        dispatch(changeClassNameForCity('itIsVisible'))
        :
        dispatch(changeClassNameForCity('itIsInvisible'))
}


const initialState = {
    classNameForNameSelect: 'itIsInvisible',
    classNameForLastNameSelect: 'itIsInvisible',
    classNameForCitySelect: 'itIsInvisible'
}


export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CLASS_NAME_FOR_NAME:

            return {
                ...state,
                classNameForNameSelect: action.value,
            }

        case CHANGE_CLASS_NAME_FOR_LAST_NAME:
            return {
                ...state,
                classNameForLastNameSelect: action.value,
            }

        case CHANGE_CLASS_NAME_FOR_CITY:
            return {
                ...state,
                classNameForCitySelect: action.value,
            }

        default:
            return state
    }
}