# Web Study - TypeScript React 프로젝트

Spring Boot 백엔드와 연동하는 TypeScript 기반 React 프론트엔드 프로젝트입니다.

## 실행 가이드

1. 프로젝트 불러오기

바탕화면 또는 프로젝트 생성 위치에서 아래의 명령어 실행
```bash
git clone https://github.com/LGH0507/Web-Study.git
```

2. 터미널에서 아래의 명령어로 디렉토리 이동 또는 **Visual Studio Code**와 같은 IDE로 프로젝트 열기
```bash
cd Web-Study
```

3. 의존성 설치 (npm 미설치 시)
```bash
npm install
```

4. 개발 서버 실행
```bash
npm run dev
```
→ `http://localhost:3000`에서 실행

---

## 과제

### CORS 확인 및 설정

1. Spring 서버와 React 서버 실행 

2. `F12`[개발자 도구] - `Console` 탭 켜놓기

3. 버튼 클릭을 통해 백엔드에 요청을 보낸 후 Console에 출력 되는 메시지 확인하기

## 주의사항

- Spring Boot 서버가 `http://localhost:8080`에서 실행 중이어야 합니다.
- 게시물 수정/삭제 및 댓글 생성 시 `X-USER-ID` 헤더가 필요합니다.

