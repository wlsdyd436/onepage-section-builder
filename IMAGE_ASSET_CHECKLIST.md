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
