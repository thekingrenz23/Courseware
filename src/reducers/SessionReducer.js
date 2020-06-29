import { SAVE_SESSION, TEACHER_SESSION } from '../actions/Types'

const initialState = {
    type: null,
    
    //teacher
    username: "",
    teacher_id: "",
    name: ""
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
                username: action.data.username,
                teacher_id: action.data.teacher_id,
                name: action.data.name
            }
        default: 
            return state
    }
}

export default SessionReducer