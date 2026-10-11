# Codyssey B1-1 | Personal Portfolio

## 프로젝트 소개
사람의 불편에서 서비스의 시작을 찾는 개인 포트폴리오 웹사이트입니다.

교육·상담·서비스 기획 경험과 AI·웹 개발 학습을 연결하고, GitHub에서 진행한 프로젝트들을 소개합니다.

## 기술 스택
- HTML5: 웹페이지 구조 및 시맨틱 태그
- CSS3: 반응형 디자인, Flexbox, Grid, CSS 변수
- JavaScript (ES6+): 화면 상태 관리 및 사용자 상호작용
- GitHub REST API: 프로젝트 정보 불러오기
- Formspree: 실제 문의 메시지 전송
- GitHub Pages: 정적 웹사이트 배포

## 주요 기능
- PC 및 모바일 반응형 레이아웃
- 모바일 햄버거 메뉴
- 라이트·다크·시스템 테마 및 사용자 선택 저장
- 스크롤 이동 및 화면 등장 애니메이션
- 제목 타이핑 애니메이션
- GitHub API를 이용한 프로젝트 카드 출력
- 프로젝트 기술별 필터
- API 로딩·오류·재시도 처리
- 문의 입력값 및 이메일 형식 검사
- Formspree를 이용한 실제 이메일 전송
- 페이지 맨 위로 이동하는 버튼

## 폴더 구조
- index.html: 웹페이지의 전체 구조
- css/style.css: 디자인 및 반응형 스타일
- js/script.js: 사용자 상호작용과 API 통신
- images/: 프로필 및 시루 일러스트
- .gitignore: Git 관리 제외 파일 설정

## 실행 방법
1. VS Code에서 프로젝트 폴더를 엽니다.
2. Live Server 확장 프로그램을 설치합니다.
3. index.html을 Live Server로 실행합니다.
4. Chrome에서 화면을 확인합니다.

별도의 프레임워크나 빌드 과정 없이 실행할 수 있습니다.

## 구현 특징
- 사용자 이벤트 → 상태 변경 → 화면 갱신 흐름을 적용했습니다.
- JavaScript의 async/await, try/catch, map, filter 등을 사용했습니다.
- CSS 미디어 쿼리로 화면 크기에 따른 디자인을 구성했습니다.
- 테마 설정은 localStorage에 저장합니다.
- 외부 API 요청이 실패하더라도 안내 메시지를 표시합니다.

## 배포
GitHub Pages 배포 후 실제 사이트 주소를 추가합니다.

## 제작
Codyssey B1-1 개인 포트폴리오 미션