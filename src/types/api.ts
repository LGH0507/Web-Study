// Spring Boot API 응답 구조
export interface GlobalResponse<T = any> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T | null;
}

// User 관련 타입
export interface CreateUserRequest {
  name: string;
  password: string;
  address: string;
  email: string;
  age: number;
}

export interface CreateUserResponse {
  name: string;
}

export interface UpdateUserRequest {
  name: string;
  password: string;
  address: string;
  email: string;
  age: number;
}

export interface User {
  id: number;
  name: string;
  password: string;
  address: string;
  email: string;
  age: number;
  created_at: string;
  updated_at: string;
}

// Post 관련 타입
export interface CreatePostRequest {
  userId: number;
  title: string;
  category: string;
  content: string;
}

export interface CreatePostResponse {
  id: number;
  title: string;
  content: string;
  category: string;
}

export interface UpdatePostRequest {
  title: string;
  category: string;
  content: string;
}

export interface GetPostList {
  postId: number;
  title: string;
  username: string;
  category: string;
  createdDate: string;
}

export interface GetPostListResponse {
  postList: GetPostList[];
}

// Comment 관련 타입
export interface CreateCommentRequest {
  content: string;
}

export interface CreateCommentResponse {
  id?: number;
  content?: string;
}



