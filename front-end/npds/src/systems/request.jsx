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

export const ImageResponse = async (textToImageInput) => {
    try {
        const formData = new FormData();
        formData.append("prompt", textToImageInput.prompt || "puppy");
        formData.append("width", textToImageInput.width || 512);  // 기본값 512
        formData.append("height", textToImageInput.height || 512);  // 기본값 512
        formData.append("samples", textToImageInput.samples || 3);  // 기본값 3
        formData.append("steps", textToImageInput.steps || 50);  // 기본값 50

        const response = await axios.post(`${BASE_URL}/api/text-to-image`,
            formData, {
                //responseType: "arraybuffer",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log("백엔드 응답 데이터:", response.data);
        const images = Object.values(response.data);
        console.log("Base64 이미지 배열:", images);
        return images;
    } catch (error) {
        console.error("stability ai 응답 실패~", error);
        throw error;
    }
}