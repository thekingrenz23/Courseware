import { SAVE_SESSION, TEACHER_SESSION } from '../actions/Types'

const initialState = {
    type: null,
    username: ""
}

const SessionReducer = (state = initialState, action) =>{
    switch(action.type){
        case SAVE_SESSION:
            return{
                ...state,
                type: action.data.type,
                username: action.data.username
            }
        case TEACHER_SESSION:
            return{
                ...state,
                type: action.data.type,
                username: action.data.username
            }
        default: 
            return state
    }
}

export default SessionReducer