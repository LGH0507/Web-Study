import { useState, useEffect } from 'react';
import { postApi } from '../api/postApi';
import type {
  CreatePostRequest,
  UpdatePostRequest,
  GetPostList,
  CreateCommentRequest,
} from '../types/api';

function PostManagement() {
  const [posts, setPosts] = useState<GetPostList[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 게시물 생성 폼
  const [createForm, setCreateForm] = useState<CreatePostRequest>({
    userId: 0,
    title: '',
    category: '',
    content: '',
  });

  // 게시물 수정 폼
  const [updateForm, setUpdateForm] = useState<UpdatePostRequest>({
    title: '',
    category: '',
    content: '',
  });
  const [updatePostId, setUpdatePostId] = useState<number | null>(null);
  const [updateUserId, setUpdateUserId] = useState<number | null>(null);

  // 게시물 삭제
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);

  // 댓글 생성
  const [commentForm, setCommentForm] = useState<CreateCommentRequest>({
    content: '',
  });
  const [commentPostId, setCommentPostId] = useState<number | null>(null);
  const [commentUserId, setCommentUserId] = useState<number | null>(null);

  // 게시물 목록 조회
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await postApi.getPostList();
      if (response.isSuccess && response.result) {
        setPosts(response.result.postList);
      } else {
        setMessage({ type: 'error', text: response.message });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || '게시물 목록을 불러오는데 실패했습니다.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 게시물 생성
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postApi.createPost(createForm);
      if (response.isSuccess) {
        setMessage({ type: 'success', text: '게시물이 생성되었습니다!' });
        setCreateForm({ userId: 0, title: '', category: '', content: '' });
        fetchPosts();
      } else {
        setMessage({ type: 'error', text: response.message });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || '게시물 생성에 실패했습니다.' });
    }
  };

  // 게시물 수정
  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updatePostId || !updateUserId) {
      setMessage({ type: 'error', text: '게시물 ID와 사용자 ID를 입력해주세요.' });
      return;
    }
    try {
      const response = await postApi.updatePost(updatePostId, updateForm, updateUserId);
      if (response.isSuccess) {
        setMessage({ type: 'success', text: '게시물이 수정되었습니다!' });
        setUpdateForm({ title: '', category: '', content: '' });
        setUpdatePostId(null);
        setUpdateUserId(null);
        fetchPosts();
      } else {
        setMessage({ type: 'error', text: response.message });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || '게시물 수정에 실패했습니다.' });
    }
  };

  // 게시물 삭제
  const handleDeletePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deletePostId || !deleteUserId) {
      setMessage({ type: 'error', text: '게시물 ID와 사용자 ID를 입력해주세요.' });
      return;
    }
    try {
      const response = await postApi.deletePost(deletePostId, deleteUserId);
      if (response.isSuccess) {
        setMessage({ type: 'success', text: '게시물이 삭제되었습니다!' });
        setDeletePostId(null);
        setDeleteUserId(null);
        fetchPosts();
      } else {
        setMessage({ type: 'error', text: response.message });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || '게시물 삭제에 실패했습니다.' });
    }
  };

  // 댓글 생성
  const handleCreateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentPostId || !commentUserId) {
      setMessage({ type: 'error', text: '게시물 ID와 사용자 ID를 입력해주세요.' });
      return;
    }
    try {
      const response = await postApi.createComment(commentPostId, commentForm, commentUserId);
      if (response.isSuccess) {
        setMessage({ type: 'success', text: '댓글이 생성되었습니다!' });
        setCommentForm({ content: '' });
        setCommentPostId(null);
        setCommentUserId(null);
      } else {
        setMessage({ type: 'error', text: response.message });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || '댓글 생성에 실패했습니다.' });
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">게시물 관리</h1>
        <button
          onClick={fetchPosts}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          새로고침
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        {/* 게시물 목록 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">게시물 목록</h2>
          {loading ? (
            <div className="text-center py-8">로딩 중...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">게시물이 없습니다.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      제목
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작성자
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      카테고리
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작성일
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.postId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {post.postId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {post.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(post.createdDate).toLocaleString('ko-KR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* 게시물 생성 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">게시물 생성</h2>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사용자 ID
                </label>
                <input
                  type="number"
                  value={createForm.userId}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, userId: parseInt(e.target.value) || 0 })
                  }
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리
                </label>
                <input
                  type="text"
                  value={createForm.category}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, category: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, title: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  내용
                </label>
                <textarea
                  value={createForm.content}
                  onChange={(e) =>
                    setCreateForm({ ...createForm, content: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              게시물 생성
            </button>
          </form>
        </div>

        {/* 게시물 수정 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">게시물 수정</h2>
          <form onSubmit={handleUpdatePost} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  게시물 ID
                </label>
                <input
                  type="number"
                  value={updatePostId || ''}
                  onChange={(e) => setUpdatePostId(parseInt(e.target.value) || null)}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사용자 ID
                </label>
                <input
                  type="number"
                  value={updateUserId || ''}
                  onChange={(e) => setUpdateUserId(parseInt(e.target.value) || null)}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  value={updateForm.title}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, title: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  카테고리
                </label>
                <input
                  type="text"
                  value={updateForm.category}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, category: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  내용
                </label>
                <textarea
                  value={updateForm.content}
                  onChange={(e) =>
                    setUpdateForm({ ...updateForm, content: e.target.value })
                  }
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              게시물 수정
            </button>
          </form>
        </div>

        {/* 게시물 삭제 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">게시물 삭제</h2>
          <form onSubmit={handleDeletePost} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  게시물 ID
                </label>
                <input
                  type="number"
                  value={deletePostId || ''}
                  onChange={(e) => setDeletePostId(parseInt(e.target.value) || null)}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사용자 ID
                </label>
                <input
                  type="number"
                  value={deleteUserId || ''}
                  onChange={(e) => setDeleteUserId(parseInt(e.target.value) || null)}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              게시물 삭제
            </button>
          </form>
        </div>

        {/* 댓글 생성 */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">댓글 생성</h2>
          <form onSubmit={handleCreateComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  게시물 ID
                </label>
                <input
                  type="number"
                  value={commentPostId || ''}
                  onChange={(e) => setCommentPostId(parseInt(e.target.value) || null)}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사용자 ID
                </label>
                <input
                  type="number"
                  value={commentUserId || ''}
                  onChange={(e) => setCommentUserId(parseInt(e.target.value) || null)}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  댓글 내용
                </label>
                <textarea
                  value={commentForm.content}
                  onChange={(e) =>
                    setCommentForm({ ...commentForm, content: e.target.value })
                  }
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              댓글 생성
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostManagement;


