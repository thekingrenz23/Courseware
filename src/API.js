import axios from 'axios'

const http = axios.create(
    {
        baseURL: "http://fusiontechph.com/courseware"
    }
)

export default{
    async getTeacherAssignments(){
        const { data, status } = await http.post('/api/getTeacherAssignments/')

        return { data, status }
    },
    async register(payload){
        const { data, status } = await http.post('/api/registerStudent/', JSON.stringify(payload))

        return { data, status }
    },
    async loginTeacher(payload){
        const { data, status } = await http.post('/api/loginTeacher/', JSON.stringify(payload))

        return { data, status }
    },
    async loginStudent(payload){
        const { data, status } = await http.post('/api/loginStudent/', JSON.stringify(payload))

        return { data, status }
    },
    async getStudentApplication(payload){
        const { data, status } = await http.post('/api/getStudentApplication/', JSON.stringify(payload))

        return { data, status }
    },
    async updateStatus(payload){
        const { data, status } = await http.post('/api/acceptStudent/', JSON.stringify(payload))

        return { data, status }
    }
}