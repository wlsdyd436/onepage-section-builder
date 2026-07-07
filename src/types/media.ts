// 모든 섹션(Hero, Logo, About, Portfolio, Before/After, Gallery 등)이 공유하는
// 이미지 표시 규칙 타입이다. 여기서 정한 값을 벗어나면 mediaDisplay.ts에서 안전한 기본값으로 대체된다.

// object-fit 방식이다. cover는 영역을 꽉 채우지만 이미지 일부가 잘릴 수 있고,
// contain은 이미지 전체를 보여주지만 빈 여백(레터박스)이 생길 수 있다.
export type MediaFit = 'cover' | 'contain';

// aspect-ratio는 "4/3" 같은 자유 문자열을 그대로 받지 않고, 이름 있는 preset만 허용한다.
// 이유: Tailwind v4는 소스 코드 안에 리터럴로 존재하는 클래스 후보만 스캔해서 CSS를 만든다.
// JSON 값으로 완성되는 `aspect-[${ratio}]` 같은 동적 클래스는 소스에 그 완성된 문자열이 없어서
// Tailwind가 인식하지 못하고 스타일이 적용되지 않는다. 그래서 미리 정해둔 preset만 허용하고,
// mediaDisplay.ts에 preset -> 실제 Tailwind 클래스로 변환하는 고정 lookup map을 둔다.
export type MediaAspectRatio = 'auto' | 'square' | 'video' | 'portrait' | 'wide';

// 객체형 media: alt/fit/position/aspectRatio 등을 세밀하게 제어하고 싶을 때 쓰는 확장 방식이다.
// 예를 들어 고객 사진이 특정 부분(얼굴, 로고 등)에서 잘리는 문제가 생기면,
// 컴포넌트 코드를 고치지 않고 이 객체의 fit/position 값만 config에서 바꿔서 해결할 수 있다.
export interface MediaItemObject {
  src: string;
  alt?: string;
  fit?: MediaFit;
  // position/mobilePosition은 object-position 값(예: "center", "top")을 그대로 받는다.
  // 실제 클래스 변환은 mediaDisplay.ts의 고정 lookup map을 거치므로,
  // 목록에 없는 값이 들어와도 안전한 기본값(center)으로 처리되고 임의 클래스가 만들어지지 않는다.
  position?: string;
  mobilePosition?: string;
  aspectRatio?: MediaAspectRatio;
  // 이미지가 없을 때(fallback) 또는 fit: contain으로 여백이 생길 때 보여줄 배경색 Tailwind 클래스다.
  backgroundColor?: string;
}

// 문자열형 media: "/clients/interior-sample/hero-01"처럼 빠르게 config를 작성하기 위한 호환 방식이다.
// 내부적으로 { src: 문자열 }로 취급되고, fit/position 등 나머지 옵션은 모두 기본값을 사용한다.
export type MediaItemInput = string | MediaItemObject;

// media input을 정규화하고 나면 항상 이 형태(모든 필드가 채워진 상태)로 다룬다.
export interface ResolvedMediaItem {
  src: string;
  alt: string;
  fit: MediaFit;
  position: string;
  mobilePosition: string;
  aspectRatio: MediaAspectRatio;
  backgroundColor: string;
}
