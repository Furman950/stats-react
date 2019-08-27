import axios from 'axios';

const instance = axios.create({
    baseURL: "http://ferminsandoval.com:5595"
});


function getQuestions() {
    return instance.get('/quiz/getQuestions', getConfig());
}

function getCategorieTypes() {
    return instance.get('/quiz/getCategoryTypes', getConfig());
}

function getConfig() {
    return {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            "Access-Control-Allow-Credentials": true
        }
    }
}

function saveQuiz(quiz) {
    return instance.post('/quiz/save', quiz);
}

function getQuizById(id) {
    return instance.get(`/quiz/results/${id}`);
}

function getLeaderBoard() {
    return instance.get('/quiz/leaderboard');
}

function getAnovaResults() {
    return instance.get('/quiz/anovaResults');
}

function login(email, passwordHash) {
    return instance.post('/user/login', { email, passwordHash });
}

function signUp(data) {
    let firstName = data.firstName;
    let lastName = data.lastName;
    let email = data.email;
    let passwordHash = data.passwordHash;
    return instance.post('/user/signUp', { firstName, lastName, email, passwordHash });
}

function getUserInfoById(userId) {
    return instance.post('/user/info', { userId });
}


export {
    getQuestions,
    getCategorieTypes,
    saveQuiz,
    getQuizById,
    getLeaderBoard,
    getAnovaResults,
    login,
    signUp,
    getUserInfoById
}