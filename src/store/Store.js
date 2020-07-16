import { createStore, combineReducers } from 'redux'
import { SessionReducer, SelectionReducer } from '../reducers'

const rootReducer = combineReducers(
    {
        session: SessionReducer,
        selection: SelectionReducer
    }
)

const configureStore = () => createStore(rootReducer)

export default configureStore