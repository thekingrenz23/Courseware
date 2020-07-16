import { SELECT_TEACHER } from '../actions/Types'

const initialState = {
    teacher_id: null,
    lname: null,
    fname: null,
    username: null,
    classes: []
}

const SelectTeacherReducer = (state = initialState, action) =>{
    switch(action.type){
        case SELECT_TEACHER:
            return{
                ...state,
                teacher_id: action.data.teacher_id,
                lname: action.data.lname,
                fname: action.data.fname,
                username: action.data.username,
                classes: action.data.classes
            }
        default:
            return state
    }
}

export default SelectTeacherReducer