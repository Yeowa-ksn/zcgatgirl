
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 집착갓걸 (Zcgatgirl)

“목표를 꾸준히 기록하고, 집착광공 스타일로 응원받는 집착형 목표 달성 도우미 웹앱”

---

## ✨ 앱의 목적 및 유도 행동

`집착갓걸`은 **목표를 꾸준히 추구하는 데 어려움을 느끼는 사람들**을 위해 만들어졌습니다.  
가끔은 잔소리, 가끔은 집착, 가끔은 귀여운 위협(?)을 통해  
**“같이 달려주는 러닝메이트”의 광기**를 느끼게 하는 것이 이 앱의 핵심 기능입니다.

- ✅ **작심삼일 방지**: 하루라도 빠지면 캐릭터 눈이 흐려지고 상태가 나빠지며, 사용자에게 “너 오늘 뭐 했어?” 하는 감시형 응원 제공  
- ✅ **기록 + 피드백**: 기록은 물론, 히트맵 시각화 + 주간 요약 + 응원 메시지로 자기 점검 루프 강화  
- ✅ **혼자 하는 것 같지 않게**: 캐릭터가 혼잣말처럼 응원/경고/관찰을 반복함으로써 지속적인 행동 유도

---

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

## 왜 이 기술들을 선택했나요?

- **Firebase**  
  Firebase는 수업에서 간단한 인증과 데이터베이스로 소개받았지만, 실무에서 활용하기 위해 직접 구성해보고 싶었습니다.  
  인증, Firestore, Hosting 등 기능이 분리되어 있어 복잡하게 느껴졌지만 이번 기회에 전체 흐름을 직접 익혀보고자 선택했습니다.

- **React + Vite**  
  빠른 개발 환경과 모듈 관리 측면에서 Vite의 개발 서버 성능이 인상적이었고, React는 UI 선언형 구성에 익숙해지기 위해 도입했습니다.

- **Gemini API (Google Generative AI)**  
  LLM을 통해 사용자 맞춤형 메시지를 생성해주는 실험을 해보고 싶었고, Gemini는 OpenAI와 달리 Google 계정으로 바로 연동해보기 쉬워 선택했습니다.

- **Mailersend + Apps Script**  
  기존에 GmailApp 사용 시 스팸처리/차단 이슈가 발생했기에, 실제 외부 발송용 API 기반 서비스를 연동하고,  
  Google Spreadsheet와 연계한 자동화 시나리오까지 함께 실습해보기 위해 Mailersend와 Apps Script를 도입했습니다.

---

## To-Do (2025-05-12 기준)

### UI/UX 개선
- [ ] `(｀皿´＃)` 캐릭터 텍스트 색상 조정 (검정 또는 진한 보라)
- [ ] 목표 피드의 배경/텍스트 대비 향상

### 기능 추가 예정
- [ ] 이메일 자동 발송 기능 (요금제로 인해 Mailersend + 스프레드시트 App Script 활용 예정)
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
```

---

## Firebase 배포 방법

Firebase CLI를 이용해 정적 호스팅을 설정합니다:

1. Firebase CLI 설치 (최초 1회)
```bash
npm install -g firebase-tools
```

2. Firebase 로그인
```bash
firebase login
```

3. Firebase 프로젝트 초기화
```bash
firebase init
```
- Hosting → `dist` 폴더를 배포 폴더로 지정
- SPA인 경우 `rewrite all to index.html` 설정

4. Vite로 빌드
```bash
npm run build
```

5. Firebase로 배포
```bash
firebase deploy
```

---

## 기여 가이드

### 프로젝트 기여 방법

1. 이 레포지토리를 포크합니다
2. 새 브랜치를 생성하세요: `git checkout -b feature/기능명`
3. 수정 후 커밋하세요: `git commit -m "Add: 원하는 기능"`
4. 푸시 후 Pull Request를 생성합니다

### 코드 스타일

- 컴포넌트 이름은 PascalCase를 사용합니다
- 기능별 폴더에 분리된 구조를 따릅니다 (`components`, `hooks`, `pages`, `firebase` 등)
- Firebase 관련 키는 `.env`로 분리하고 Git에 포함하지 않습니다

---

## 라이선스

MIT © 2025 zcgatgirl 프로젝트팀