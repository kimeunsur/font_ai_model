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
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        console.error("로그인 에러:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
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
        console.error("회원가입 에러: ", error.response?.data || error.message);
        throw error;
    }
};

//letter db에 저장
export const letterStore = async (base64Data) => {
    try {
        const formData = new FormData();
        const binary = atob(base64Data.split(",")[1]);
        const array = [];
        for (let i=0; i<binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        const blob = new Blob([new Uint8Array(array)], {type: "image/png"});
        formData.append("file", blob, "letter.png");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
        const token = localStorage.getItem("token");
        const response = await axios.post(
            `${BASE_URL}/letter/upload`,
            formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("편지 db에 저장안됨: ", error.response?.data || error.message);
        throw error;
    }
  };

export const fetchUserLetters = async () => {
    try {
        const token = localStorage.getItem("token");
        console.log("token hehe",token);
        const response = await axios.get(
            `${BASE_URL}/letter/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                //responseType: "arraybuffer",
            }
        );
        const base64Letters = response.data.map((letter) => {
            const base64Content = btoa(
                new Uint8Array(letter.content.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                )
            );

            return {
                ...letter,
                content: `data:image/png;base64,${base64Content}`, // Base64 포맷의 PNG 이미지 데이터
            };
        });

        return base64Letters;
    } catch (error) {
        console.error("편지 가져오기 실패:", error.response?.data || error.message);
        throw error;
    }
}

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
        console.error("stability ai 응답 실패~", error.response?.data || error.message);
        throw error;
    }
}
