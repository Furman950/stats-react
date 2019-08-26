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
    // let username = sessionStorage.getItem('username');
    // let passwordToken = sessionStorage.getItem('passwordToken');
    return {
        headers: {
            // "username": username,
            // "passwordToken": passwordToken,
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

export {
    getQuestions,
    getCategorieTypes,
    saveQuiz,
    getQuizById,
    getLeaderBoard,
    getAnovaResults
}