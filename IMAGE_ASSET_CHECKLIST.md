# IMAGE_ASSET_CHECKLIST

## 1. 목적

이 문서는 onepage-section-builder의 인테리어 데모 페이지(`interior-sample`)에 필요한 이미지 자산과, 실제 이미지 적용 전/후 확인해야 할 사항을 정리한다.

## 2. 현재 이미지 처리 방식

- extensionless path 사용: JSON config에는 확장자 없이 경로만 기록한다(예: `/clients/interior-sample/hero/hero-01`).
- `mediaResolver.ts`(`resolveMediaPath`)가 빌드 시점에 `public/` 폴더에서 실제 존재하는 확장자 파일을 찾는다.
- 우선순위(코드 기준, `src/lib/mediaResolver.ts`의 `SUPPORTED_EXTENSIONS`): **avif → webp → jpg → jpeg → png**
- 이미지가 없으면(`resolveMediaPath`가 `null` 반환) `MediaImage.astro`는 `<img>` 자체를 렌더링하지 않고 wrapper의 fallback 배경색만 표시한다. HeroMedia01/Header01도 같은 원리로 파일이 없으면 이미지를 렌더링하지 않는다 — 이 방식 덕분에 파일이 없어도 404 요청 자체가 발생하지 않는다.
- broken image icon이 보이지 않아야 한다(위 방식으로 인해 구조적으로 발생하지 않음).

## 3. 필요한 이미지 목록

### 브랜드

| 용도 | 권장 경로(extensionless) | 권장 비율 | 필요 수량 | 비고 |
| --- | --- | --- | --- | --- |
| 로고 | `/clients/interior-sample/brand/logo` | 정사각형(1:1) 권장 | 1 | avif/webp 권장, 현재 `logo.png`(1254×1254) 존재 |

### Hero

| 용도 | 권장 경로(extensionless) | 권장 비율 | 필요 수량 | 비고 |
| --- | --- | --- | --- | --- |
| 대표 이미지 | `/clients/interior-sample/hero/hero-01` | 16:9 또는 wide(가로가 긴 형태) | 1 | 현재 `hero-01.jpg`(1000×744, 약 4:3) 존재 — 아래 7번 참고 |
| 보조 이미지(슬라이더) | `/clients/interior-sample/hero/hero-02`, `hero-03` 등 | hero-01과 동일 비율 | 선택 | HeroMedia01은 media 배열이 2장 이상이면 자동 슬라이더로 전환됨(현재 JSON은 1장만 참조) |

### Portfolio

| 용도 | 권장 경로(extensionless) | 권장 비율 | 필요 수량 | 비고 |
| --- | --- | --- | --- | --- |
| 시공 사례 | `/clients/interior-sample/portfolio/portfolio-01` ~ `portfolio-06` | 4:3 또는 16:9(현재 config는 `video`=16:9로 설정) | 6 | 현재 파일 없음 |

### BeforeAfter

| 용도 | 권장 경로(extensionless) | 권장 비율 | 필요 수량 | 비고 |
| --- | --- | --- | --- | --- |
| before | `/clients/interior-sample/before-after/before-01` ~ `before-03` | 4:3 또는 16:9(현재 config는 `video`=16:9로 설정) | 3 | 현재 파일 없음, before/after는 반드시 동일 비율로 촬영해야 나란히 비교했을 때 어색하지 않음 |
| after | `/clients/interior-sample/before-after/after-01` ~ `after-03` | before와 동일 | 3 | 현재 파일 없음 |

## 4. 파일명 규칙

- 영문 소문자
- 공백 없음
- 의미 있는 번호 사용(`portfolio-01`, `before-01`/`after-01`처럼 쌍이 맞아야 하는 경우 번호를 일치시킴)
- extensionless path는 JSON에 확장자 없이 기록
- 실제 파일은 avif/webp/jpg/jpeg/png 가능
- 동일 이름의 여러 확장자가 있을 경우 `mediaResolver`의 우선순위(avif → webp → jpg → jpeg → png)를 따른다

## 5. 저작권/고객자료 주의사항

- 고객 제공 이미지는 사용 허락을 확인한 뒤에만 사용한다.
- 인물/간판/차량번호/개인정보가 노출되는지 확인한다.
- 외부 이미지를 무단으로 가져오지 않는다.
- AI 생성 이미지를 쓸 경우 데모 목적임을 표시한다.
- 실제 업체 시공 사례처럼 오해될 수 있는 이미지(가짜 전후 비교 등)는 특히 주의한다.
- GitHub public repo에는 실제 고객 이미지를 올리지 않는다(6번 참고).

## 6. 고객 이미지 vs 공개 데모 이미지 분리

- `.gitignore`에 `/public/clients/interior-sample/`가 이미 등록되어 있어, 이 폴더에 넣는 실제 이미지는 Git에 커밋되지 않는다(로컬/배포 환경에만 존재).
- 권장 원칙:
  - 실제 고객 이미지: `public/clients/{client-id}/` 아래에 두거나 외부 storage 사용, Git에는 올리지 않음(현재 `.gitignore` 설정과 일치).
  - 공개 데모/저작권 문제 없는 이미지(레포에 커밋해도 되는 것): 별도 경로(예: `public/demo-assets/` 또는 `public/shared/placeholders/`)를 새로 만들어 분리 — 아직 해당 폴더는 존재하지 않으며, 필요해지면 별도 단계에서 생성한다.
  - 원본 고해상도 파일: 별도 보관(레포/배포 대상 아님).
  - 웹용 최적화 파일: avif/webp 우선, jpg/png는 fallback.

## 7. 현재 점검 결과 (2026-07-10 기준)

`public/clients/interior-sample/`에 실제로 존재하는 파일:

| 경로 | 파일 | 크기 | JSON에서 참조 중? |
| --- | --- | --- | --- |
| `brand/` | `logo.png` | 1254×1254 | 예 (`header.logo`) |
| `hero/` | `hero-01.jpg` | 1000×744 | 예 (`hero.media[0]`) |
| `hero/` | `hero-02.png` | - | **아니오** — 파일은 있으나 JSON `hero.media` 배열에 아직 포함되지 않음 |
| `hero/` | `hero-03.jpg` | - | **아니오** — 위와 동일 |
| `hero/` | `hero-05.jpg` | - | **아니오** — 위와 동일(hero-04는 없음) |
| `portfolio/` | (폴더 없음) | - | 아니오 — 6장 전부 fallback 배경으로 표시 중 |
| `before-after/` | (폴더 없음) | - | 아니오 — before/after 6장 전부 fallback 배경으로 표시 중 |

**참고(수정 없이 관찰만 기록)**: `hero-02.png`/`hero-03.jpg`/`hero-05.jpg`는 이미 public 폴더에 있지만 현재 `interior-sample.json`의 `hero.media`는 `hero-01` 한 장만 참조하고 있어 슬라이더로 전환되지 않은 상태다. 여러 장을 `hero.media` 배열에 추가하면 HeroMedia01이 자동으로 슬라이더 모드(2장 이상)로 전환되므로, 필요 시 다음 단계에서 JSON을 수정해 활성화할 수 있다. 이번 단계는 점검/문서화 범위라 JSON은 수정하지 않았다.

**제한적 QA 수행 결과** (`logo.png`, `hero-01.jpg` 대상, 375/390/430/768/1280 5개 viewport):

- 두 이미지 모두 5개 viewport에서 200 응답, 404/failed request 없음.
- 로고: `h-8 w-auto`(contain 방식)로 32×32px 표시, 정사각형 원본이라 잘림 없음.
- Hero: `object-cover`로 전체 화면(`min-h-screen`/`min-h-[100svh]`) full-bleed 배경으로 정상 표시, 5개 viewport 모두 가로 스크롤 없음.
- **crop 관련 권장사항**: `hero-01.jpg`는 약 4:3(1000×744) 비율인데 Hero 섹션은 전체 화면 폭을 `object-cover`로 채우는 구조라, 와이드 데스크톱(1280px 이상)에서는 이미지 좌우가 상당히 크롭된다. 향후 실제 고객 Hero 이미지를 받을 때는 16:9 이상의 와이드 비율로 촬영/제공받는 것을 권장한다(3번 표에 이미 권장 비율로 반영함).

## 8. 이미지 적용 후 QA (다음 실제 투입 시 체크리스트)

- [ ] `npx astro build`
- [ ] `/` 페이지 확인
- [ ] `/showroom` 페이지 확인
- [ ] 375 / 390 / 430 / 768 / 1280 viewport 확인
- [ ] crop/fit/position 확인(특히 Portfolio/BeforeAfter는 `fit`/`position`을 JSON에서 객체형으로 조정 가능)
- [ ] 모바일에서 얼굴/공간 핵심 영역이 잘리지 않는지 확인
- [ ] 404 없음
- [ ] failed request 없음
- [ ] broken image icon 없음
- [ ] 파일이 없는 슬롯은 fallback이 유지되는지 확인
- [ ] Lighthouse 또는 수동 로딩 속도 확인(후보, 이번 단계 범위 아님)

## 9. 현재 샘플 자산 점검 결과 (2026-07-13 기준)

- 점검 날짜: 2026-07-13
- 점검 대상:
  - `src/data/clients/interior-sample.json`
  - `public/clients/interior-sample/`
  - `src/lib/mediaResolver.ts` / `src/lib/mediaDisplay.ts` / `src/components/media/MediaImage.astro` / `src/components/sections/hero/HeroMedia01.astro`

### 확인된 자산 구조

`public/clients/interior-sample/`에 실제 존재하는 폴더/파일:

- `brand/`: `logo.png` (1254×1254)
- `hero/`: `hero-01.jpg`, `hero-02.png`, `hero-03.jpg`, `hero-05.jpg`
- `portfolio/`: 폴더 자체가 없음
- `before-after/`: 폴더 자체가 없음
- `service/`, `review/`: 폴더 없음 — 아래 JSON 참조 점검에서 확인했듯 ServiceCards01/Review01은 애초에 이미지 필드를 쓰지 않는 설계라 폴더가 필요하지 않음(ServiceCards01은 title/description/features/note만 사용, Review01은 텍스트와 별 문자(★)만 사용)

### JSON 참조 경로 점검

| 구분 | JSON 경로 | 실제 파일 존재 | 상태 | 메모 |
| --- | --- | ---: | --- | --- |
| 로고 | `header.logo` → `brand/logo` | O | OK | `logo.png`, Header01이 직접 `h-8 w-auto`(contain)로 처리, MediaImage 미사용 |
| Hero 대표 | `hero.media[0]` → `hero/hero-01` | O | OK / crop 확인 필요 | `hero-01.jpg` 약 4:3, `object-cover` 풀블리드라 와이드 데스크톱에서 좌우 크롭됨(7번 기존 기록과 동일) |
| Hero 슬라이더 후보 | (JSON 미참조) `hero/hero-02`, `hero-03`, `hero-05` | O | 파일은 있으나 미사용 | `hero.media` 배열에 아직 추가되지 않아 슬라이더 비활성 상태(7번 기존 기록과 동일, 변동 없음) |
| Portfolio 1~6 | `portfolio.items[].image.src` → `portfolio/portfolio-01`~`06` | X | 누락 (fallback 표시 중) | `aspectRatio: "video"`(16:9) 고정, MediaImage가 `<img>` 없이 `bg-neutral-800` 배경만 표시 |
| BeforeAfter before 1~3 | `beforeAfter.items[].beforeImage.src` → `before-after/before-01`~`03` | X | 누락 (fallback 표시 중) | `aspectRatio: "video"` 고정 |
| BeforeAfter after 1~3 | `beforeAfter.items[].afterImage.src` → `before-after/after-01`~`03` | X | 누락 (fallback 표시 중) | `aspectRatio: "video"` 고정 |
| Services | (해당 필드 없음) | 해당 없음 | 설계상 이미지 미사용 | `ServiceCards01.astro`에 image/media prop 자체가 없음(텍스트 카드) |
| Review | (해당 필드 없음) | 해당 없음 | 설계상 이미지 미사용 | `Review01.astro`에 image/media prop 자체가 없음(별점은 ★/☆ 문자) |

### mediaResolver / MediaImage / HeroMedia01 동작 확인

- `resolveMediaPath`(mediaResolver.ts)는 extensionless 경로에 `avif → webp → jpg → jpeg → png` 순서로 확장자를 붙여가며 `public/` 안에 실제 파일이 있는지 `fs.existsSync`로 확인한다. 우선순위는 체크리스트 2번 기록과 일치함을 코드로 재확인했다.
- 파일을 못 찾으면 `resolveMediaPath`/`normalizeMediaItem`이 `null`을 반환하고, `MediaImage.astro`와 `HeroMedia01.astro` 모두 이 경우 `<img>` 태그 자체를 렌더링하지 않는다 — 즉 브라우저가 404를 요청할 대상 자체가 없어 broken image 아이콘이 구조적으로 발생하지 않는다(현재 Portfolio 6장/BeforeAfter 6장 전부 이 경로로 fallback 처리 중).
- `MediaImage.astro`는 이미지가 없어도 `getAspectRatioClassForPreset`로 요청한 `aspectRatio`(video 등)만큼의 높이를 유지해, 그리드/카드 레이아웃이 이미지 유무와 무관하게 무너지지 않는다.
- `HeroMedia01.astro`는 `MediaImage`를 쓰지 않고 `normalizeMediaList` + `getObjectFitClass`/`getObjectPositionClass`를 직접 호출하는 별도 구현이다. 배경 레이어에 항상 `bg-neutral-800`을 먼저 깔아두므로 이미지가 없어도 섹션 자체(`min-h-screen`)는 무너지지 않는다. Header01의 로고도 MediaImage를 쓰지 않고 직접 `<img>` + `logoText`로 처리하는 별도 구현이다 — 세 곳(MediaImage/HeroMedia01/Header01)이 각자 구현이지만 "파일 없으면 `<img>` 자체를 만들지 않는다"는 원칙은 공통으로 지켜지고 있음을 코드로 확인했다.

### 모바일 이미지 QA 위험

- **hero mobilePosition**: `mediaDisplay.ts`의 `normalizeMediaItem`은 `mobilePosition` 필드를 정규화 결과에 채워두지만, `getObjectPositionClass`는 현재 `position` 값만 클래스로 변환하고 `mobilePosition`은 실제로 소비하지 않는다(코드 주석에도 "확장 포인트"로 명시됨). 즉 지금은 모바일/PC가 항상 같은 초점을 쓴다 — 실제 고객 Hero 사진에서 핵심 피사체가 모바일 세로 화면에서 잘린다면, 이 지점을 모바일 전용 클래스로 확장하는 작업이 별도로 필요하다(이번 단계 범위 아님, 다음 후보로 기록).
- **before/after 비율 차이**: 두 이미지 모두 `aspectRatio: "video"`(16:9)로 고정되어 있어 촬영 비율이 서로 다르면 `object-cover`로 각각 다른 비율만큼 크롭되어 나란히 비교했을 때 어색할 수 있다(5번 저작권/자료 기준의 "동일 각도 촬영 권장"과 연결됨).
- **portfolio 가로/세로 혼합**: 6개 항목 모두 `aspectRatio: "video"` 고정이라, 세로 사진(좁은 공간/인물 위주 구도)이 들어오면 상당 부분이 crop된다. `fit`/`position`은 항목별 객체형으로 이미 개별 조정 가능한 구조이므로, 실제 투입 시 사진별로 `position`(top/bottom 등)을 조정해야 할 가능성이 높다.
- **service card**: 이미지 슬롯 자체가 없어 crop 위험도 없음(설계상 해당 없음).
- **logo**: Header01이 `h-8 w-auto`(contain 방식, 비율 유지)로 처리해 crop 위험 없음. 현재 로고가 정사각형이라 별도 조정 불필요.

### 실제 고객 이미지 적용 전 필수 조건

- 고객 제공 이미지 사용 권한 확인(CLIENT_INTAKE_CHECKLIST.md 5·6번과 연동)
- 원본 고해상도 확보
- 이미지 파일명 규칙 통일(4번 규칙 참고: `portfolio-01`처럼 before/after 번호 일치)
- extensionless path 유지(JSON에 확장자 기재 금지)
- webp 우선 제공 권장(용량 대비 화질, avif 지원 시 더 우선)
- Portfolio/BeforeAfter는 투입 후 항목별 `fit`/`position` 재조정 필요 여부 확인(모바일 crop 위험 항목 참고)
- Hero는 가능하면 16:9 이상 와이드 비율로 촬영/제공받는 것을 권장(기존 7번 기록과 동일)
- 실제 투입 후 `npx astro build` + `npm run validate:anchors` + 5개 viewport 화면 QA 필수
