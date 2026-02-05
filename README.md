# 오늘의 날씨 — 대한민국 날씨

> 대한민국 날씨 정보 조회 및 즐겨찾기 관리 웹 애플리케이션

**배포 URL**: https://weather-ko.vercel.app

![CI](https://github.com/ds92ko/weather-ko/actions/workflows/ci.yml/badge.svg)

## 🚀 프로젝트 실행 방법

### 사전 요구사항

- Node.js 20+
- pnpm 9+

### API 키 발급

#### OpenWeatherMap

> 현재 날씨 및 시간대별 예보 조회

- [https://openweathermap.org](https://openweathermap.org)
- One Call API 3.0 사용 (Rate Limit 시 Free API로 자동 폴백)

#### Kakao Developers

> 주소 ↔ 좌표 변환

- [https://developers.kakao.com](https://developers.kakao.com)
- REST API 키 발급

### 환경 변수 설정

`.env.example`을 복사해 `.env` 파일 생성

```bash
cp .env.example .env
```

발급받은 API 키 입력

```
VITE_OWM_API_KEY=your_openweathermap_api_key
VITE_KAKAO_API_KEY=your_kakao_rest_api_key
```

### 설치 및 실행

```bash
pnpm install        # 의존성 설치
pnpm dev            # 개발 서버 실행 (http://localhost:5173)
pnpm build          # 프로덕션 빌드
pnpm test           # 테스트 실행
pnpm lint           # ESLint
pnpm format:check   # Prettier 검사
```

## ✨ 구현 기능

### 현재 위치 날씨 조회

앱 첫 진입 시 브라우저 Geolocation API로 사용자 위치를 감지하고, Kakao 역지오코딩 API를 통해 좌표를 행정구역명으로 변환합니다.  
해당 위치의 현재 기온, 최저/최고 기온, 시간대별 기온을 표시합니다.  
위치 권한을 거부한 경우 "위치 정보를 가져올 수 없습니다" 안내와 함께 브라우저 설정에서 허용 후 새로고침하라는 문구를 보여주며, 장소 검색으로 직접 조회할 수 있습니다.

### 장소 검색

제공된 `korea_districts.json` 데이터(약 20,000개 행정구역)를 기반으로 시·군·구·동 모든 단위의 검색을 지원합니다.  
검색어 입력 시 매칭되는 장소 리스트를 드롭다운으로 표시하고, 선택 시 해당 장소의 날씨 상세 페이지로 이동합니다.

- 300ms 디바운스로 입력 최적화
- IntersectionObserver 기반 무한 스크롤 (50건씩 점진적 렌더링)
- 지원되지 않는 장소 접근 시 "해당 장소의 정보가 제공되지 않습니다" 안내

### 즐겨찾기

검색한 장소를 즐겨찾기에 추가/삭제할 수 있으며, 최대 6개까지 카드 UI로 표시됩니다.  
각 카드에는 현재 날씨와 최저/최고 기온이 표시되고, 클릭 시 상세 페이지로 이동합니다.

- 장소 별칭(이름) 수정 지원
- localStorage 영속 저장 + 탭 간 동기화

### 반응형 디자인

데스크탑과 모바일 뷰에 맞춘 반응형 레이아웃을 구현했습니다.  
즐겨찾기 카드 그리드는 화면 크기에 따라 1~3열로 조정되고, 시간대별 기온은 가로 스크롤(드래그 스크롤 포함)로 탐색할 수 있습니다.

## 🛠 기술적 의사결정

### FSD 아키텍처 적용

```
src/
├── app/         # 진입점, Provider, 라우팅, 레이아웃
├── pages/       # 페이지 단위 조합
├── widgets/     # 독립적 UI 블록 (CurrentWeather, FavoriteList 등)
├── features/    # 사용자 인터랙션 (검색, 즐겨찾기 CRUD)
├── entities/    # 비즈니스 엔티티 (weather, location API·모델·쿼리)
└── shared/      # 공용 유틸, UI 컴포넌트, 설정
```

의존 방향을 `app → pages → widgets → features → entities → shared`로 단방향 유지했습니다.  
entities 레이어에서 API 함수, 응답 타입, TanStack Query 옵션을 분리하여 API 교체 시 영향 범위를 최소화했습니다.

### 코드 구조화 및 유지보수성

#### Query Factory 패턴

TanStack Query의 `queryOptions`를 활용해 쿼리 키와 함수를 한 곳에서 관리합니다.  
쿼리 키 충돌을 방지하고, 자동완성과 타입 추론이 가능합니다.

```ts
const weatherQueries = {
  all: ['weather'] as const,
  weather: (query: WeatherQuery) =>
    queryOptions({
      queryKey: [...weatherQueries.all, query],
      queryFn: () => openWeatherMapApi.getWeather(query),
    }),
}
```

#### API 응답 타입과 도메인 타입 분리

OpenWeatherMap API의 원본 응답 타입(`OneCallResponse`)과 앱에서 사용하는 타입(`WeatherResult`)을 분리해 API 응답 구조가 변경되어도 도메인 로직에 영향을 주지 않습니다.  
즐겨찾기(`Favorite`), 에러 폴백 타입 등도 `features/*/model`, `shared/config`에 분리하여 확장 시 한 곳만 수정하면 됩니다.

#### 설정값 중앙화

매직 넘버 대신 `config/`에 상수를 정의하여 변경 시 한 곳만 수정하면 됩니다. (`MAX_FAVORITES = 6`, `STORAGE_KEY` 등)

#### 타입 기반 에러 프리셋

에러 타입을 객체로 정의하고 `keyof typeof`로 타입을 추출하여, 프리셋 추가/삭제 시 타입이 자동으로 갱신됩니다.

### OpenWeatherMap One Call 3.0 → Free API 폴백

One Call API 3.0은 1시간 단위의 상세한 시간별 예보와 일별 데이터를 한 번의 요청으로 제공하지만, 무료 호출 제한(429)이 있습니다.  
Rate Limit 응답 시 자동으로 Current Weather + 5 Day Forecast API 조합으로 폴백하여 서비스 안정성을 확보했습니다.  
Free API는 3시간 간격 예보만 제공하지만, 서비스 중단 없이 기본 기능을 유지할 수 있습니다.

### Kakao API 양방향 활용

위치 기반 서비스를 위해 Kakao Local API를 두 가지 방향으로 활용했습니다.

- **지오코딩**: 검색한 주소 → 위·경도 변환 (날씨 API 호출용)
- **역지오코딩**: 현재 위치 좌표 → 행정구역명 변환 (사용자에게 표시)

### useSyncExternalStore 기반 상태 관리

즐겨찾기 데이터는 여러 페이지(홈, 상세)에서 동시에 참조됩니다.  
Zustand 같은 외부 라이브러리도 고려했지만, 즐겨찾기 하나의 상태를 관리하기 위해 추가 의존성을 도입하는 것은 과하다고 판단했습니다.  
대신 React 18에서 도입된 `useSyncExternalStore`와 localStorage를 조합해 약 60줄의 경량 store를 직접 구현했습니다.

- React 동시성 모드 호환
- storage 이벤트를 통한 탭 간 동기화
- 타입 검증(validate)을 통한 손상된 데이터 복구

### 검색 성능 최적화

약 20,000건의 행정구역 데이터 검색 시 두 가지 최적화를 적용했습니다.

- **디바운스**: 300ms 지연으로 매 키 입력마다 필터링 실행 방지
- **점진적 렌더링**: IntersectionObserver로 초기 50건만 렌더링, 스크롤 시 추가 로드

검색 결과 컴포넌트를 분리하고 `key={debouncedValue}`를 적용하여, 검색어 변경 시 React가 컴포넌트를 리마운트하면서 자연스럽게 visibleCount가 초기화되도록 했습니다.

### TanStack Query 설정

#### 데이터 캐싱 전략

날씨 데이터는 자주 변하지 않으므로 `staleTime: 15분`, `gcTime: 30분`으로 설정하여 불필요한 API 호출을 줄였습니다.  
같은 장소를 반복 조회해도 캐시된 데이터를 사용하여 빠른 응답을 제공합니다.

#### QueryClient 재시도 전략

4xx 에러(클라이언트 에러)는 즉시 실패 처리하고, 네트워크/서버 에러만 최대 2회 재시도하도록 설정했습니다.

### 계층적 에러 처리

- **ErrorBoundary**: 컴포넌트 렌더링 중 예상치 못한 에러 포착
- **errorElement**: React Router 라우트/로더 레벨 에러 처리
- **FallbackError**: 404, 지원하지 않는 장소 등 의도된 폴백을 에러로 던져 ErrorBoundary에서 타입별 UI 분기
- **경로별 초기화**: ErrorBoundary에 `key={location.pathname}`을 적용해 라우트 전환 시 이전 페이지의 에러 상태가 남지 않도록 초기화

### 테스트 전략

핵심 비즈니스 로직과 재사용 유틸에 집중하여 41개의 유닛 테스트를 작성했습니다.

#### 테스트 대상 선정 기준

- **순수 로직**: 외부 의존성 없이 입력 → 출력이 명확한 함수
- **핵심 비즈니스 로직**: 즐겨찾기 CRUD, 타입 검증 등 앱의 주요 기능
- **재사용 유틸**: 여러 곳에서 사용되어 회귀 방지가 중요한 함수

#### 테스트 작성 항목

| 대상               | 테스트 내용                                 |
| ------------------ | ------------------------------------------- |
| `useFavorites`     | 추가/삭제/중복 방지/최대 6개 제한/별칭 수정 |
| `createLocalStore` | 저장/조회/구독/손상된 데이터 복구           |
| `isFavoriteShape`  | 타입 가드 검증 (유효/무효 케이스)           |
| `format`           | displayLocation/formatHourlyTime 포맷팅     |
| `ApiError`         | status/message 속성, Error 상속 검증        |
| `useDebounce`      | 디바운스 타이밍 동작                        |
| `ErrorBoundary`    | 에러 포착 및 FallbackError 타입별 UI 분기   |

#### 테스트 제외 항목

- **API 호출**: TanStack Query가 내부적으로 재시도, 캐싱, 에러 처리를 담당하며 이미 잘 테스트된 라이브러리. API 응답 파싱 로직은 타입으로 검증되고, 실제 통신은 통합/E2E 테스트 영역
- **브라우저 API 의존 훅**: `useGeolocation`, `useIntersectionObserver`는 브라우저 API를 얇게 감싼 래퍼로, 자체 로직이 거의 없음. 브라우저 API 자체를 테스트하는 것은 의미 없음
- **UI 컴포넌트**: 대부분 props를 받아 렌더링하는 조합 컴포넌트로, 비즈니스 로직이 없음. 시각적 검증은 스토리북이나 E2E가 더 적합

### UX 고려사항

#### 스켈레톤 UI

날씨 데이터 로딩 중 레이아웃 시프트를 방지하기 위해 실제 콘텐츠와 동일한 크기의 스켈레톤을 적용했습니다.  
즐겨찾기 카드, 현재 날씨, 시간대별 예보 각각에 맞춤 스켈레톤을 구현하여 로딩 중에도 안정적인 레이아웃을 유지합니다.

#### 드래그 스크롤

시간대별 기온 영역은 모바일에서 터치 스크롤이 자연스럽지만, 데스크탑에서는 가로 스크롤이 불편합니다.  
`useDragScroll` 훅을 구현하여 마우스 드래그로 스크롤할 수 있도록 했고, 드래그 중 커서와 텍스트 선택 상태를 적절히 관리했습니다.

### 접근성

- WAI-ARIA 속성(`role`, `aria-expanded` 등) 적용
- 이모지 아이콘에 `aria-hidden="true"` 추가
- 시맨틱 마크업과 h2/h3 계층 유지로 아웃라인 명확화
- 어두운 배경에서 색상 대비 확보
- `useTitle` 훅으로 페이지별 `document.title` 설정

### SEO

`index.html`에 meta description, Open Graph, Twitter Card 메타 태그를 설정하여 검색 결과와 SNS 공유 시 적절한 정보가 노출되도록 했습니다.

### SPA 라우팅 처리

존재하지 않는 경로 접근 시 React Router의 `path: '*'`로 커스텀 404 페이지를 보여주도록 구현했습니다.  
로컬에서는 정상 동작했지만, Vercel 배포 후에는 React Router가 처리하기 전에 Vercel이 먼저 404를 반환하는 문제가 있었습니다.  
`vercel.json`의 `rewrites` 설정으로 모든 요청을 `index.html`로 전달하여 React Router가 라우팅을 처리하도록 해결했습니다.  
추가로 `robots.txt`를 배치하여 검색 엔진 크롤러가 정상적으로 접근할 수 있도록 했습니다.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

## 📦 기술 스택

| 구분      | 기술                     | 선택 이유                         |
| --------- | ------------------------ | --------------------------------- |
| Framework | React 19, TypeScript 5.9 | 최신 동시성 기능 + 타입 안정성    |
| 빌드      | Vite 7                   | 빠른 HMR, ESM 기반 개발 경험      |
| 서버 상태 | TanStack Query 5         | 캐싱, 재시도, stale 관리 자동화   |
| 라우팅    | React Router 7           | 선언적 라우팅, errorElement 지원  |
| 스타일    | Tailwind CSS 3, CVA      | 유틸리티 기반 + variant 관리      |
| 테스트    | Vitest, Testing Library  | Vite 네이티브 통합, 빠른 실행     |
| CI/CD     | GitHub Actions, Vercel   | PR마다 자동 검증, 프리뷰 배포     |
| 아키텍처  | Feature-Sliced Design    | 단방향 의존성, 명확한 레이어 분리 |

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── layout/              # Header, Footer, Layout
│   ├── providers/           # QueryClientProvider
│   ├── routes/              # createBrowserRouter 설정
│   └── styles/              # 전역 CSS
├── pages/
│   ├── home/                # 메인 페이지
│   ├── weather/             # 날씨 상세 페이지
│   └── not-found/           # 404 페이지
├── widgets/
│   ├── weather/             # CurrentWeather, HourlyForecast
│   └── favorite/            # FavoriteList, FavoriteCard
├── features/
│   ├── favorites/           # 즐겨찾기 CRUD 로직
│   ├── location/            # 장소 검색 UI
│   └── weather/             # 날씨 조회 훅
├── entities/
│   ├── weather/             # OpenWeatherMap API, 타입, 쿼리
│   └── location/            # Kakao API, 타입, 쿼리
├── shared/
│   ├── api/                 # ApiError, QueryClient
│   ├── lib/                 # 유틸 함수, 커스텀 훅
│   ├── ui/                  # 공용 컴포넌트
│   └── data/                # korea_districts.json
test/
└── setup.ts                 # Vitest 설정
```
