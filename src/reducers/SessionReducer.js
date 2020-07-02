import { SAVE_SESSION, TEACHER_SESSION } from '../actions/Types'

const initialState = {
    type: null,
    name: "",

    //teacher
    username: "",
    teacher_id: "",

    //student
    user_id: "",
    enroll_id: ""
}

const SessionReducer = (state = initialState, action) =>{
    switch(action.type){
        case SAVE_SESSION:
            return{
                ...state,
                type: action.data.type,
                name: action.data.name,
                user_id: action.data.user_id,
                enroll_id: action.data.enroll_id
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