# COMPATIBILITY_QA_CHECKLIST

## 1. 목적

onepage-section-builder로 제작한 원페이지 사이트를 납품하기 전, 다양한 브라우저/모바일/인앱 브라우저 환경에서 깨지지 않는지 확인하기 위한 기준을 정리한다.

## 2. 기본 원칙

- Chrome PC에서 정상이라고 최종 완료로 보지 않는다.
- 모바일 QA는 단순 viewport 확인이 아니다.
- iPhone / Android / 주요 모바일 브라우저 / 인앱 브라우저 차이를 고려한다.
- 실제 고객 이미지 적용 후 다시 확인한다.
- sticky header, fixed CTA, safe-area, tel/kakao 링크는 모바일에서 반드시 확인한다.

## 3. 데스크톱 브라우저 기준

필수 또는 권장 확인:

- Chrome
- Edge
- Firefox
- 가능하면 macOS Safari

확인 항목:

- 레이아웃 깨짐 없음
- 가로 스크롤 없음
- sticky header 정상
- hero 이미지 crop/텍스트 가독성
- nav anchor 정상
- footer 링크 정상
- 폰트 줄바꿈 이상 없음

## 4. 모바일 브라우저 기준

필수 또는 권장 확인:

- iOS Safari
- Android Chrome
- Samsung Internet
- 모바일 Firefox / 모바일 Edge 가능성 고려

확인 항목:

- 360 / 375 / 390 / 412 / 430 / 768 viewport 확인
- 가로 스크롤 없음
- 하단 StickyMobileCTA01이 콘텐츠/푸터를 가리지 않는지
- iOS safe-area 대응
- 주소창 접힘/펼침에 따른 높이 변화
- 100vh / svh / dvh 차이로 hero 높이가 이상해지지 않는지
- 버튼 터치 영역이 충분한지
- 긴 텍스트 줄바꿈이 자연스러운지
- 이미지 crop/position이 자연스러운지

## 5. 인앱 브라우저 기준

확인 대상:

- 카카오톡 인앱 브라우저
- 네이버 앱 인앱 브라우저
- 가능하면 인스타그램/페이스북 인앱 브라우저

확인 항목:

- 외부 링크 동작
- tel 링크 동작
- kakao 링크 동작
- sticky CTA 클릭 가능 여부
- 뒤로가기/외부 브라우저 열기 흐름
- 하단 safe-area 또는 앱 UI와 CTA 겹침 여부

## 6. 필수 viewport 목록

최소 확인:

- 360px
- 375px
- 390px
- 412px
- 430px
- 768px
- 1280px

의미:

- 360: 좁은 Android
- 375: iPhone SE/mini 계열 대응
- 390: 일반 iPhone 계열 대응
- 412/430: Android/Samsung 계열 대응
- 768: tablet/mobile boundary
- 1280: desktop 기본 확인

## 7. 현재 프로젝트에서 특히 중요한 항목

- Header01 sticky 동작
- HeroMedia01 cover crop
- HeroMedia01 mobilePosition 확장 필요 여부(현재 `mobilePosition` 필드는 정규화만 되고 실제로 소비되지 않음 — [IMAGE_ASSET_CHECKLIST.md](./IMAGE_ASSET_CHECKLIST.md) 9번 참고)
- PortfolioGrid01 세로 사진 crop 위험(현재 전 항목 `aspectRatio: video` 고정)
- BeforeAfter01 before/after 이미지 비율 차이
- StickyMobileCTA01 하단 고정 CTA와 footer 겹침
- ContactCTA01 / Footer01 / Header01의 `#contact` 이동
- tel/kakao 링크 정상 동작
- `npm run validate:anchors` 통과 여부

## 8. 실제 이미지 적용 후 QA

실제 고객 이미지 적용 후 확인:

- Hero 이미지는 16:9 이상 가로형 권장
- Hero는 cover 방식이므로 일부 crop은 정상
- 중요한 피사체가 텍스트 영역과 충돌하지 않는지
- 모바일에서 얼굴/핵심 공간이 잘리지 않는지
- Portfolio 이미지는 가능하면 비율을 통일
- Before/After는 촬영 각도와 비율을 최대한 맞춤
- 이미지 로딩 실패 시 fallback이 자연스러운지

## 9. 완료 기준

납품 전 최소 완료 기준:

- `npx astro build` 성공
- `npm run validate:anchors` 성공
- 360/375/390/412/430/768/1280 viewport에서 가로 스크롤 없음
- Chrome/Edge/Firefox 기본 확인
- iOS Safari 또는 iPhone 유사 환경 확인
- Android Chrome 또는 Samsung Internet 확인
- tel/kakao 링크 확인
- Sticky CTA와 footer 겹침 없음
- 실제 이미지 crop 확인
- 고객에게 전달할 링크/연락처 정상

## 10. 아직 자동화하지 않을 것

현재 단계에서는 자동화하지 않는다:

- 전체 Playwright cross-browser 테스트
- 실제 기기 자동 테스트
- 카카오톡/네이버 인앱 브라우저 자동화
- 스크린샷 diff 자동 비교
- Lighthouse 자동 리포트
- 시각 회귀 테스트

향후 고객 납품이 반복되면 별도 자동화 후보로 검토한다.

## 11. 현재 프로젝트와 연결

- 실제 데모 페이지: `/` (`src/pages/index.astro`)
- 섹션 전시장: `/showroom` (`src/pages/showroom.astro`)
- 내부 앵커 검증 스크립트: `scripts/validate-anchors.mjs`(`npm run validate:anchors`)
- 이미지 자산 기준: [IMAGE_ASSET_CHECKLIST.md](./IMAGE_ASSET_CHECKLIST.md)
- 납품 전 QA 체크리스트: [DELIVERY_CHECKLIST.md](./DELIVERY_CHECKLIST.md)
- 프로젝트 상태: [PROJECT_STATE.md](./PROJECT_STATE.md)
