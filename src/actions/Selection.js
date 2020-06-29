import { SELECT_TEACHER } from './Types'

export const selectTeacher = (teacherData) => (
    {
        type: SELECT_TEACHER,
        data: teacherData
    }
)