import axios from "axios";
const BASE_URL = "http://localhost:8080";

//유저 로그인
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

//gpt 답변 가져오기
export const GptResponse = async (gptInput) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/answers`,
            {question: gptInput}, {
                headers: {
                    'Content-Type' : 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("GPT 응답 실패:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw error;
    }
}