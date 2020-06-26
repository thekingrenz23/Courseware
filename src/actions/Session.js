import { SAVE_SESSION, TEACHER_SESSION } from './Types'

export const studentSession = (sessionData) => (
    {
        type: SAVE_SESSION,
        data: sessionData
    }
)

export const teacherSession = (sessionData) => (
    {
        type: TEACHER_SESSION,
        data: sessionData
    }
)