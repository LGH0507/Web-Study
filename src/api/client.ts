import axios, { AxiosInstance } from 'axios';
import type { GlobalResponse } from '../types/api';

// API 클라이언트 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터 - GlobalResponse 구조로 변환
apiClient.interceptors.response.use(
  (response) => {
    // Spring Boot의 GlobalResponse 구조에 맞춰 반환
    return response.data;
  },
  (error) => {
    // 에러 처리
    if (error.response) {
      // 서버에서 응답이 온 경우
      return Promise.reject(error.response.data || error.response);
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      return Promise.reject({
        isSuccess: false,
        code: 'NETWORK_ERROR',
        message: '네트워크 오류가 발생했습니다.',
        result: null,
      });
    } else {
      // 요청 설정 중 오류가 발생한 경우
      return Promise.reject({
        isSuccess: false,
        code: 'REQUEST_ERROR',
        message: '요청 중 오류가 발생했습니다.',
        result: null,
      });
    }
  }
);

export default apiClient;



