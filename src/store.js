import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import contactsList, {initUsers} from './state/contactsList'
import singleContactChange from './state/singleContactChange'

export const reducer = combineReducers({
    contactsList,
    singleContactChange
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

store.dispatch(initUsers())