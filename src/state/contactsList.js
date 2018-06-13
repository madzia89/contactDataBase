const FETCH_USERS_SUCCESS = 'state/FETCH_USERS_SUCCESS'

export const fetchusersSuccess = (jsonUsers) => ({
    type: FETCH_USERS_SUCCESS,
    jsonUsers
})

export const initUsers = () => (dispatch, getState) => {
    fetch("https://randomuser.me/api/?results=100")
        .then(res => res.json())
        .then(jsonUsers => {
            dispatch(fetchusersSuccess(jsonUsers))
        })
}


const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {

        case FETCH_USERS_SUCCESS:
            const users = action.jsonUsers
            const myContacts = users.results
            return {
                ...state,
                contacts: myContacts,
            }
        default:
            return state
    }
}

