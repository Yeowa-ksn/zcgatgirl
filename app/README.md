# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 집착갓걸 (Zcgatgirl)

“목표를 꾸준히 기록하고, 집착광공 스타일로 응원받는 집착형 목표 달성 도우미 웹앱”

## 주요 기능

- 이메일 기반 회원가입 및 로그인
- 목표 최대 3개까지 저장 가능 (추가 제한)
- 날짜별 목표 달성 여부 기록 (했다/안 했다)
- 히트맵 기반 달성 시각화
- 달성률에 따라 캐릭터 PNG 이미지 자동 전환
- Gemini API 기반 집착형 동기부여 메시지 생성
- 이메일 미리보기 UI 구현 (자동 발송 예정)
- 주간 성취 요약 리포트
- 사용자 목표 피드 기능
- 다크모드 전환 기능

---

## 기술 스택

- **Frontend**: React (with Vite), Firebase Hosting
- **Backend / DB**: Firebase Authentication, Firestore
- **API 연동**: Google Generative AI (Gemini API)

---

## To-Do (2025-05-12 기준)

### UI/UX 개선
- [ ] `(｀皿´＃)` 캐릭터 텍스트 색상 조정 (검정 또는 진한 보라)
- [ ] 목표 피드의 배경/텍스트 대비 향상

### 기능 추가 예정
- [ ] 이메일 자동 발송 기능 (Firebase Functions 활용 예정)
- [ ] 목표 달성률 기반 메일링 로직 개선
- [ ] 사용자 주간 리포트 자동 생성

### 리팩토링 및 최적화
- [ ] Gemini API 유틸 분리 및 에러 처리 보강
- [ ] 정적 이미지 경로 문제 해결 (Firebase 배포 기준)
- [ ] 빌드시 chunk size 경고 해결

---

## 배포 주소

[https://zcgatgirl.web.app](https://zcgatgirl.web.app)

---

## 개발 환경

이 프로젝트는 Vite 기반의 React 앱입니다.

현재 ESLint가 적용되어 있으며 다음 공식 플러그인을 포함합니다:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)

---

## Vite 기본 명령어

```bash
npm install      # 의존성 설치
npm run dev      # 개발 서버 실행
npm run build    # 배포용 빌드
npm run preview  # 로컬에서 빌드 결과 미리보기