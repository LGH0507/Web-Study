import apiClient from './client';
import type {
  GlobalResponse,
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
} from '../types/api';

export const userApi = {
  // 사용자 생성
  createUser: async (
    data: CreateUserRequest
  ): Promise<GlobalResponse<CreateUserResponse>> => {
    const response = await apiClient.post<GlobalResponse<CreateUserResponse>>(
      '/users',
      data
    );
    return response;
  },

  // 사용자 수정
  updateUser: async (
    userId: number,
    data: UpdateUserRequest
  ): Promise<GlobalResponse<UpdateUserRequest>> => {
    const response = await apiClient.put<GlobalResponse<UpdateUserRequest>>(
      `/users/${userId}`,
      data
    );
    return response;
  },

  // 사용자 삭제
  deleteUser: async (userId: number): Promise<GlobalResponse<null>> => {
    const response = await apiClient.delete<GlobalResponse<null>>(
      `/users/${userId}`
    );
    return response;
  },
};


