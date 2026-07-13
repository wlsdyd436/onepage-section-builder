# SECTION_CONFIG_DESIGN

## 1. 목적

onepage-section-builder에서 고객별 섹션 조합, preset, layout, sectionRegistry, nav anchor 검증 방향을 정리한다.

## 2. 현재 구조

현재 상태:

- `/` 페이지는 `src/pages/index.astro`에서 직접 import/render 방식
- `/showroom`은 `src/lib/sectionRegistry.ts` 기반 preview 방식
- `src/data/clients/interior-sample.json`은 샘플 고객 데이터
- `sectionRegistry`는 현재 showroom 전시용 역할이 중심
- index 렌더링은 아직 registry 자동 렌더링이 아님

현재 장점:

- 단순하고 디버깅 쉬움
- 섹션 순서와 배치를 명확히 제어 가능
- Astro/TypeScript 빌드 시 prop 문제를 비교적 빠르게 확인 가능
- MVP 단계에서 안정적

현재 한계:

- 고객별 섹션 조합 자동화가 어렵다
- preset 변경이 코드 수정으로 이어진다
- index.astro import 목록과 sectionRegistry 목록이 이중 관리된다
- navItems와 실제 section id가 자동 검증되지 않는다
- sectionRegistry의 previewProps가 특정 샘플 고객 데이터와 섞일 수 있다

## 3. 목표 구조

향후 목표 구조:

```
client config
→ layout config
→ main sections 배열
→ sectionRegistry에서 component resolve
→ section별 data resolve
→ page renderer가 순서대로 렌더링
```

단, 현재 단계에서는 구현하지 않는다.

## 4. 용어 정의

- **Section**: 페이지 본문(main) 안에서 조합/순서 변경/on-off가 의미 있는 콘텐츠 단위 컴포넌트(예: PortfolioGrid01, Review01)
- **Layout Component**: 페이지 전역에서 항상 같은 위치를 차지하는 컴포넌트(Header01/Footer01/StickyMobileCTA01)
- **Section Registry**: id → component + 메타데이터를 연결하는 카탈로그(`src/lib/sectionRegistry.ts`)
- **Client Config**: 고객 1명의 실제 콘텐츠 데이터(현재는 `interior-sample.json`)
- **Preset**: 콘텐츠 없이 섹션 타입 순서만 정의한 업종별 템플릿
- **Showroom**: 등록된 섹션을 실제 화면으로 미리 볼 수 있는 전시장 페이지(`/showroom`)
- **Page Renderer**: client config의 sections 배열을 읽어 실제 컴포넌트를 순서대로 렌더링하는 장치(아직 미구현)
- **Nav Anchor Validation**: navItems의 target이 실제 존재하는 section id를 가리키는지 확인하는 절차

## 5. 권장 아키텍처: 하이브리드 구조

권장:

- Header01은 `layout.header`
- Footer01은 `layout.footer`
- StickyMobileCTA01은 `layout.stickyCta`
- main 안의 콘텐츠 섹션만 `sections[]`

이유:

- Header는 항상 최상단
- Sticky는 fixed overlay라 문서 흐름 밖
- Footer는 항상 하단 layout 성격
- 실제 순서 변경/on-off가 필요한 것은 main 콘텐츠 섹션들

주의:

- showroom 노출 여부와 layout/sections 분류는 별개다.
- Footer는 showroom preview가 가능하지만 page rendering에서는 layout으로 둘 수 있다.

## 6. 고객별 config 초안

문서 예시만 작성한다. 실제 JSON 파일은 수정하지 않는다.

예시 구조:

```json
{
  "site": {},
  "layout": {
    "header": {},
    "footer": {},
    "stickyCta": {}
  },
  "sections": [
    {
      "type": "HeroMedia01",
      "id": "hero",
      "enabled": true,
      "data": {}
    },
    {
      "type": "PortfolioGrid01",
      "id": "portfolio",
      "enabled": true,
      "data": {}
    },
    {
      "type": "BeforeAfter01",
      "id": "before-after",
      "enabled": true,
      "data": {}
    },
    {
      "type": "Review01",
      "id": "reviews",
      "enabled": true,
      "data": {}
    },
    {
      "type": "ProcessSteps01",
      "id": "process",
      "enabled": true,
      "data": {}
    },
    {
      "type": "FAQ01",
      "id": "faq",
      "enabled": true,
      "data": {}
    },
    {
      "type": "ServiceCards01",
      "id": "services",
      "enabled": true,
      "data": {}
    },
    {
      "type": "ContactCTA01",
      "id": "contact",
      "enabled": true,
      "data": {}
    }
  ]
}
```

## 7. Section config 최소 필드

MVP 최소 필드:

- `type`: sectionRegistry의 id와 매칭되는 섹션 타입
- `id`: 실제 anchor id. nav가 가리키는 섹션은 명시 권장
- `enabled`: 노출 여부
- `data`: 해당 섹션에 넘길 데이터

현재는 넣지 않을 필드:

- complex condition
- user role
- pricing rule
- animation config
- drag/drop position
- CMS binding
- AB test config
- payment rule
- login rule

## 8. Preset 구조 초안

Preset 정의:

- 콘텐츠가 없는 섹션 순서 템플릿
- 고객 데이터와 분리
- client config 생성 시 복사해서 사용
- 자동 생성기는 현재 구현하지 않음

예시:

**interior-basic**

- HeroMedia01
- PortfolioGrid01
- ServiceCards01
- ContactCTA01

**interior-trust**

- HeroMedia01
- PortfolioGrid01
- BeforeAfter01
- Review01
- ProcessSteps01
- FAQ01
- ContactCTA01

**interior-full**

- HeroMedia01
- PortfolioGrid01
- BeforeAfter01
- Review01
- ProcessSteps01
- FAQ01
- ServiceCards01
- ContactCTA01

**quick-lead**

- HeroMedia01
- ServiceCards01
- ContactCTA01

주의:

- Header/Footer/Sticky는 preset의 main sections와 분리해서 layout preset으로 볼 수 있다.
- ContactCTA01은 대부분 preset에서 필수에 가깝다.

## 9. sectionRegistry 역할 재정의

현재:

- showroom preview metadata
- component 연결
- previewProps 제공

향후:

- 고객 데이터 없는 순수 섹션 카탈로그
- id → component 연결
- category, label, description, preview 가능 여부 관리
- renderer와 showroom이 같은 registry를 참조

주의:

- registry에 고객별 실제 데이터를 넣지 않는다.
- previewProps는 샘플 preview 전용으로 분리하거나 최소화한다.
- registry를 너무 빨리 복잡하게 만들지 않는다.

나중에 추가 후보:

- defaultDataKey
- requiredProps
- category
- supportedIndustries
- isLayout
- isFixed
- canRenderInShowroom
- recommendedAnchors
- defaultOrder
- thumbnail
- tags
- version

## 10. Page renderer 구현 후보

**A안: index.astro 직접 렌더 유지**

장점:

- 단순
- 안정적
- 디버깅 쉬움

단점:

- 고객별 조합 자동화 어려움

**B안: sections 배열 기반 renderer**

장점:

- 고객별 조합 가능
- preset 적용 가능
- 반복 제작 속도 향상

단점:

- 타입/props/data 연결 복잡도 증가
- any 스프레드 위험
- layout/fixed component 처리 기준 필요

**C안: 하이브리드**

- Header/Footer/Sticky는 직접 또는 layout config 기반
- main 안의 sections만 config 기반 renderer

추천: 초기에는 C안이 가장 안전하다.

## 11. Nav anchor 검증 방향

배경:

- 기존 Header nav dead anchor 문제는 "회사소개 → #about"이 실제 섹션 없이 존재해서 발생했다.
- 현재는 "서비스 → #services"로 수정 완료되었다.
- 하지만 근본적으로 navItems와 실제 section id가 자동 검증되지 않는 구조는 남아 있다.

향후 기준:

- 실제 존재하는 anchor 집합을 sections[]에서 파생
- navItems[].target이 실제 enabled section id에 포함되는지 검증
- nav가 가리키는 섹션은 sections[].id를 명시
- "top" 같은 특수 target은 별도 allow-list로 관리 가능
- validateNavAnchors 같은 빌드 타임 검증 함수 도입 후보

문서에 명시:

- process/reviews처럼 컴포넌트 기본 id에 우연히 의존하는 방식은 장기적으로 피한다.
- config/preset 도입 시 nav와 sections 간 검증을 설계에 포함한다.

## 12. 타입 안전성 트레이드오프

현재 직접 렌더 방식:

- section별 props를 명시적으로 넘길 수 있다
- 타입 문제를 비교적 빨리 잡을 수 있다

config 기반 renderer:

- 반복 제작에는 유리하지만 props/dataKey 연결이 느슨해질 수 있다
- any 스프레드가 늘어날 위험이 있다
- 최소한 section type 유효성, enabled section id, nav target 검증은 필요하다

방침:

- renderer 구현 전 설계를 문서화
- 실제 구현은 별도 승인 후 진행
- 첫 구현은 main sections만 대상으로 제한

## 13. 사용환경 범용성 기준

sections config/preset 구조에서도 유지할 기준:

- 375/390/430/768/1280 viewport QA
- 가로 스크롤 없음
- anchor 유효성 확인
- tel/kakao 링크 확인
- sticky/footer overlap 확인
- 긴 텍스트 overflow 확인
- 이미지 fallback 확인
- 실제 이미지 적용 후 crop/fit/position 확인
- Chrome PC만으로 완료 판단 금지

## 14. 아직 구현하지 않을 것

- drag/drop builder
- CMS/admin
- customer-facing section selector
- preset 자동 생성 UI
- DB 저장
- 결제/로그인
- A/B test
- 복잡한 rule engine
- animation config
- 실시간 미리보기 편집기
- renderer 즉시 전환
- 기존 index.astro 구조 대체

## 15. 권장 단계적 전환 순서

1. 현재 index.astro 직접 렌더 유지
2. SECTION_CONFIG_DESIGN.md로 설계 확정
3. nav anchor 검증 기준 또는 스크립트 설계
4. 두 번째 client sample을 만들 때 sections[]를 실험적으로 추가
5. main-only SectionRenderer를 별도 파일로 실험
6. 기존 index.astro와 결과가 동일한지 비교
7. 승인 후 점진 전환

## 16. 다음 단계 후보

- Header nav anchor 검증 스크립트 또는 문서
- 두 번째 client sample 구조 설계
- sections config prototype 문서화
- main-only page renderer 실험
- 실제 이미지 적용 테스트
- 고객별 preset 목록 확정
