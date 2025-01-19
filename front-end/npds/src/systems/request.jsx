import axios from "axios";
const BASE_URL = "http://localhost:8080";

//get 요청; 유저 로그인 → 밑에는 post인데?
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/login`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("로그인 에러:",error);
        throw error;
    }
};

//post 요청; 유저 회원가입
export const createUser = async (userData) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/create`, 
            userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("회원가입 에러ㅗㅗ: ",error);
        throw error;
    }
};