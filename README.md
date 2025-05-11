# 💘 집착갓걸 (Zcgatgirl)

목표를 향한 집착, 그 누구보다 강력하게 응원해줄 **집착갓걸** 등장!  
귀여운 토마토 캐릭터와 함께, 당신의 목표 달성률에 따라  
시각화된 히트맵, 캐릭터 변화, 명언, 이메일 알림까지 모두 제공합니다.

![StatusImage Example](./src/assets/level1_happy.png)

---

## ✨ 주요 기능

- [x] **회원가입 & 로그인 (Firebase Auth)**
- [x] **목표 추가 및 저장 (Firestore)**
- [x] **3개 목표 제한 + 삭제 가능**
- [x] **일일 달성 여부 기록 ("했다"/"안했다")**
- [x] **히트맵을 통한 달성 이력 시각화 (최근 30일)**
- [x] **달성률에 따른 캐릭터 PNG 이미지 변화**
- [x] **Gemini 기반 동기부여 명언 출력**
- [x] **이메일로 팩폭 스타일의 메시지 수동 전송**
- [x] **다크모드 지원**
- [x] **사용자 목표 피드 (Goal Feed)**

---

## ⚙️ 기술 스택

- **Frontend**: Vite + React
- **Backend**: Firebase (Auth, Firestore, Hosting)
- **AI Model**: Gemini API (Google Generative AI)
- **배포 환경**: Firebase Studio + GitHub 연동

---

## 🚀 설치 및 실행

```bash
# 1. 클론
git clone https://github.com/Yeowa-ksn/zcgatgirl.git
cd zcgatgirl/app

# 2. 환경변수 설정
# .env 파일을 프로젝트 루트(app/)에 생성하고 다음 내용 추가
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_GEMINI_API_KEY=...

# 3. 패키지 설치 및 실행
npm install
npm run dev

# 4. 향후 추가 예정 기능 및 개선 방향
	•	목표별 이메일 리마인더 예약 발송 (시간 설정 가능)
	•	Gemini 명언에 감정 분석 기반 조정 기능 추가
	•	다양한 캐릭터 테마 추가 (고양이, 힙스터, 집착마왕 등)
	•	히트맵 외 주간/월간 그래프 추가
	•	PWA 적용으로 모바일 홈화면 추가 기능
	•	피드 백업 & 내보내기 기능 (.csv/.pdf)
	•	친구들과 목표 공유 및 응원하기

# ❤️ 만든 사람
	•	프로젝트: 집착갓걸 MVP
	•	개발자: Yeowa-ksn
	•	피드백: 언제든지 PR / Issue 환영합니다!
