import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Spring Boot 연동 프로젝트
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          TypeScript React 프론트엔드와 Spring Boot 백엔드 연동
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <Link
            to="/users"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              사용자 관리
            </h2>
            <p className="text-gray-600">
              사용자 생성, 수정, 삭제 기능을 제공합니다.
            </p>
          </Link>

          <Link
            to="/posts"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              게시물 관리
            </h2>
            <p className="text-gray-600">
              게시물 생성, 조회, 수정, 삭제 및 댓글 기능을 제공합니다.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;


