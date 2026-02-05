# 오늘의 날씨 — 대한민국 날씨

> 대한민국 날씨 정보 조회 및 즐겨찾기 관리 웹 애플리케이션

## 🔗 배포 URL

[https://weather-ko.vercel.app](https://weather-ko.vercel.app)

## 🚀 프로젝트 실행 방법

### 사전 요구사항

- Node.js 18+
- pnpm(권장) 또는 npm, yarn

### API 키 발급

#### OpenWeatherMap

> 현재 날씨 및 시간대별 예보 조회

- [https://openweathermap.org](https://openweathermap.org)
- One Call API 3.0 또는 2.5(무료) 사용 가능

#### Kakao Developers

> 주소 ↔ 위·경도 변환 (지오코딩 / 역지오코딩)

- [https://developers.kakao.com](https://developers.kakao.com)
- REST API 키 발급

### 환경 변수 설정

`.env.example`을 복사하여 `.env` 파일을 생성합니다.

```bash
cp .env.example .env
```

발급받은 API 키를 입력합니다.

```
VITE_OWM_API_KEY=your_openweathermap_api_key
VITE_KAKAO_API_KEY=your_kakao_rest_api_key
```

### 설치 및 실행

#### 의존성 설치

```bash
pnpm install
```

#### 개발 서버 실행 (http://localhost:5173)

```bash
pnpm dev
```

#### 프로덕션 빌드

```bash
pnpm build
```

#### 빌드 결과물 로컬 미리보기

```bash
pnpm preview
```
