# DELIVERY_CHECKLIST

## 1. 목적

이 문서는 원페이지 제작 완료 후 납품 또는 배포 전에 확인해야 할 항목을 정리한 체크리스트입니다. 고객에게 보여주기 전 내부 QA에 사용하며, 향후 원페이지 제작 상품을 반복 판매할 때 표준 운영 문서로 사용합니다.

## 2. 기본 정보 확인

- [ ] 업체명 표기 확인
- [ ] 대표 서비스명 확인
- [ ] 한 줄 소개 확인
- [ ] 전화번호 확인
- [ ] 카카오채널/외부 상담 링크 확인
- [ ] 주소/영업시간 확인
- [ ] 사업자 정보 확인
- [ ] 로고 표시 확인
- [ ] 고객이 승인한 문구만 사용했는지 확인

## 3. 페이지 구조 확인

현재 원페이지 기준 섹션 순서(`src/pages/index.astro`):

Header → Hero → Portfolio → BeforeAfter → Review → ProcessSteps → FAQ → ServiceCards → Contact → Footer → StickyMobileCTA

체크 항목:

- [ ] 섹션 순서가 자연스러운지
- [ ] 중복 CTA가 과하지 않은지
- [ ] ContactCTA와 StickyMobileCTA가 충돌하지 않는지
- [ ] Footer가 자연스럽게 마감되는지
- [ ] 필요 없는 섹션(CONFIG TEST 등 개발용 임시 영역)이 남아 있지 않은지

## 4. Header / 내비게이션 확인

- [ ] 상단 메뉴가 실제 존재하는 섹션으로 이동하는지
- [ ] dead anchor가 없는지
- [ ] 모바일 메뉴가 정상 동작하는지
- [ ] CTA 버튼이 `#contact` 또는 실제 링크로 이동하는지

**현재 known issue**:

- Header01의 "회사소개" 메뉴(`header.navItems`의 `target: "about"`)는 현재 `#about` 섹션이 실제로 렌더링되지 않아 클릭해도 아무 곳에도 이동하지 않는 dead anchor 상태입니다(`src/data/clients/interior-sample.json`의 `sections.about`은 메타데이터만 남아있고, `index.astro`에는 `id="about"` 섹션이 없음).
- 납품 전 아래 중 하나로 반드시 정리가 필요합니다.
  - About01 섹션을 새로 추가한다.
  - "회사소개" 메뉴 항목을 삭제한다.
  - "회사소개"를 실제 존재하는 섹션(예: 서비스 `#services`)으로 연결을 바꾼다.
  - 다른 실제 섹션으로 연결한다.
- 이 정리 작업은 이번 28단계 범위가 아니며, 별도 단계에서 진행합니다.

## 5. CTA / 링크 확인

- [ ] Header CTA 정상
- [ ] Hero CTA 정상
- [ ] StickyMobileCTA 정상
- [ ] ContactCTA 정상
- [ ] Footer tel 링크 정상
- [ ] Footer 카카오 링크 정상
- [ ] 모든 외부 링크 `target`/`rel="noopener noreferrer"` 확인
- [ ] 빈 href 없음
- [ ] `#`만 있는 링크 없음(단, 로고의 "클릭 시 맨 위로 스크롤" 용도는 의도된 동작이므로 예외)
- [ ] 잘못된 anchor 없음(위 4번 known issue 포함)

## 6. 이미지 확인

자세한 파일명/경로/비율 기준은 [IMAGE_ASSET_CHECKLIST.md](./IMAGE_ASSET_CHECKLIST.md)를 참고합니다.

- [ ] 로고 표시 확인
- [ ] Hero 이미지 표시 확인
- [ ] Portfolio 이미지 표시 확인
- [ ] BeforeAfter 이미지 표시 확인
- [ ] 이미지 404 없음
- [ ] broken image icon 없음
- [ ] fallback 표시 정상(이미지가 없는 슬롯은 fallback 배경으로 자연스럽게 처리되는지)
- [ ] 모바일에서 crop/fit/position 확인
- [ ] 고객 이미지 사용 허락 확인
- [ ] 개인정보/차량번호/얼굴/주소 노출 확인

## 7. 문구 / 콘텐츠 확인

- [ ] 오탈자 확인
- [ ] 고객이 승인한 문구인지 확인
- [ ] 과장 표현 없는지 확인
- [ ] "100% 보장", "무조건 최저가", "절대 문제 없음" 같은 표현 없는지 확인
- [ ] 후기에 실명/정확한 주소/전화번호가 노출되지 않는지 확인
- [ ] FAQ 답변이 법적 책임을 만들 수 있는 단정 표현인지 확인
- [ ] 사업자 정보 placeholder(예: "사업자 정보는 고객 자료 확인 후 입력합니다")가 실제 납품본에 그대로 남아 있지 않은지 확인

## 8. 반응형 / 사용환경 확인

필수 viewport:

- 375 x 812
- 390 x 844
- 430 x 932
- 768 x 1024
- 1280 x 900

체크 항목:

- [ ] 가로 스크롤 없음
- [ ] 텍스트가 화면 밖으로 나가지 않음
- [ ] 긴 한글 줄바꿈 정상(`break-keep` + `break-words`)
- [ ] CTA 버튼 터치 가능(44px 이상 터치 영역)
- [ ] StickyMobileCTA가 Footer를 가리지 않음
- [ ] PC(1280)에서 StickyMobileCTA 숨김
- [ ] 모바일/태블릿/PC 레이아웃 자연스러움

추가 실기기 확인 후보(Playwright headless로 대체 불가한 항목):

- iOS Safari
- Android Chrome
- Samsung Internet
- 카카오톡 인앱 브라우저
- 네이버 인앱 브라우저
- Edge

## 9. 기술 QA

- [ ] `npx astro build` 성공
- [ ] `/` 정상
- [ ] `/showroom` 정상
- [ ] console error 없음
- [ ] failed request 없음
- [ ] 404 없음
- [ ] `scrollWidth === clientWidth`(5개 viewport 전부)
- [ ] anchor 이동 후 Header에 가려지지 않음
- [ ] tel 링크 정상
- [ ] 카카오/외부 링크 정상
- [ ] public 이미지 경로 정상
- [ ] `.gitignore` 확인(실제 고객 이미지가 Git에 올라가지 않는지)

## 10. Showroom 확인

- [ ] `/showroom` 접속 가능
- [ ] `sectionRegistry` 등록 섹션 표시
- [ ] preview 정상
- [ ] fixed/sticky 요소(Header01/StickyMobileCTA01)가 showroom을 덮지 않음
- [ ] 실제 데모 페이지에 없는 실험 섹션이 고객에게 노출되어도 되는지 확인
- [ ] `/showroom`을 고객에게 보여줄지, 내부용으로만 쓸지 결정

## 11. 배포 전 확인

- [ ] 배포 대상 브랜치 확인
- [ ] 최종 commit/push 확인
- [ ] 빌드 산출물 확인
- [ ] 환경변수 필요 여부 확인
- [ ] 도메인 연결 여부 확인
- [ ] 외부 링크(카카오채널 등) 실제 접속 확인
- [ ] 고객 승인 완료 여부 확인
- [ ] 최종 캡처 또는 화면 녹화 보관(후보)
- [ ] 배포 후 모바일 접속 확인

## 12. 고객 최종 확인 항목

고객에게 직접 확인받을 항목:

- [ ] 업체명/연락처/주소
- [ ] 대표 문구
- [ ] 서비스 설명
- [ ] 시공 사례
- [ ] 전후 비교
- [ ] 고객 후기
- [ ] FAQ 답변
- [ ] 이미지 사용
- [ ] 링크 동작
- [ ] 모바일 화면
- [ ] 최종 배포 승인

## 13. 납품 후 운영 확인

- [ ] 수정 요청 범위 정리
- [ ] 유지보수 범위 정리
- [ ] 이미지/문구 교체 요청 방식 정리
- [ ] 추가 섹션 요청 시 비용/범위 확인
- [ ] 월 유지보수 여부
- [ ] 백업 방식
- [ ] GitHub repo 관리 방식
- [ ] 고객 자료 보관 방식

## 14. 현재 프로젝트와 연결

- 실제 데모 페이지: `/` (`src/pages/index.astro`)
- 섹션 전시장: `/showroom` (`src/pages/showroom.astro`)
- 고객 데이터: `src/data/clients/interior-sample.json`
- 섹션 registry: `src/lib/sectionRegistry.ts`
- 이미지 체크리스트: [IMAGE_ASSET_CHECKLIST.md](./IMAGE_ASSET_CHECKLIST.md)
- 고객자료 수집 체크리스트: [CLIENT_INTAKE_CHECKLIST.md](./CLIENT_INTAKE_CHECKLIST.md)
- 프로젝트 상태: [PROJECT_STATE.md](./PROJECT_STATE.md)

## 15. 최종 납품 전 체크 요약

- [ ] 고객 정보 확인
- [ ] 이미지 사용 허락 확인
- [ ] 모든 링크 확인(Header "회사소개" known issue 정리 포함)
- [ ] 모바일 화면 확인
- [ ] PC 화면 확인
- [ ] build 성공
- [ ] 404 없음
- [ ] console error 없음
- [ ] 고객 최종 승인
- [ ] 배포 완료
- [ ] 배포 후 접속 확인
