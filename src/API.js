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
    },
    async getStory(payload){
        const { data, status } = await http.post('/api/getStory/', JSON.stringify(payload))

        return { data, status }
    },
    async addScore(payload){
        const { data, status } = await http.post('/api/addScore/', JSON.stringify(payload))

        return { data, status }
    },
    async getSummary(payload){
        const { data, status } = await http.post('/api/getSummary/renz.php', JSON.stringify(payload))

        return { data, status }
    },
    async getUnlockedStory(payload){
        const { data, status } = await http.post('/api/getUnlockedStory/renz.php', JSON.stringify(payload))

        return { data, status }
    },
    async getUserTrophy(payload){
        const { data, status } = await http.post('/api/getUserTrophy/', JSON.stringify(payload))

        return { data, status }
    },
    async getLeaderBoardStudent(payload){
        const { data, status } = await http.post('/api/getLeaderBoardStudent/', JSON.stringify(payload))

        return { data, status }
    },
    async getLeaderBoardTeacher(payload){
        const { data, status } = await http.post('/api/getLeaderBoardTeacher/', JSON.stringify(payload))

        return { data, status }
    },
    async getStudentRecord(payload){
        const { data, status } = await http.post('/api/getStudentRecord/', JSON.stringify(payload))

        return { data, status }
    }
}