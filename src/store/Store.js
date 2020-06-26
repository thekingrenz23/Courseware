import { createStore, combineReducers } from 'redux'
import { SessionReducer } from '../reducers'

const rootReducer = combineReducers(
    {
        session: SessionReducer
    }
)

const configureStore = () => createStore(rootReducer)

export default configureStore