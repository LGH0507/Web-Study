import apiClient from './client';
import type {
  GlobalResponse,
  CreatePostRequest,
  CreatePostResponse,
  UpdatePostRequest,
  GetPostListResponse,
  CreateCommentRequest,
  CreateCommentResponse,
} from '../types/api';

export const postApi = {
  // 게시물 생성
  createPost: async (
    data: CreatePostRequest
  ): Promise<GlobalResponse<CreatePostResponse>> => {
    const response = await apiClient.post<GlobalResponse<CreatePostResponse>>(
      '/post',
      data
    );
    return response;
  },

  // 게시물 목록 조회
  getPostList: async (): Promise<GlobalResponse<GetPostListResponse>> => {
    const response = await apiClient.get<GlobalResponse<GetPostListResponse>>(
      '/post'
    );
    return response;
  },

  // 게시물 수정
  updatePost: async (
    postId: number,
    data: UpdatePostRequest,
    userId: number
  ): Promise<GlobalResponse<null>> => {
    const response = await apiClient.put<GlobalResponse<null>>(
      `/post/${postId}`,
      data,
      {
        headers: {
          'X-USER-ID': userId.toString(),
        },
      }
    );
    return response;
  },

  // 게시물 삭제
  deletePost: async (
    postId: number,
    userId: number
  ): Promise<GlobalResponse<null>> => {
    const response = await apiClient.delete<GlobalResponse<null>>(
      `/post/${postId}`,
      {
        headers: {
          'X-USER-ID': userId.toString(),
        },
      }
    );
    return response;
  },

  // 댓글 생성
  createComment: async (
    postId: number,
    data: CreateCommentRequest,
    userId: number
  ): Promise<GlobalResponse<CreateCommentResponse>> => {
    const response = await apiClient.post<
      GlobalResponse<CreateCommentResponse>
    >(`/post/${postId}/comment`, data, {
      headers: {
        'X-USER-ID': userId.toString(),
      },
    });
    return response;
  },
};


