import { resolveMediaPath } from './mediaResolver';
import type {
  MediaAspectRatio,
  MediaFit,
  MediaItemInput,
  MediaItemObject,
  ResolvedMediaItem,
} from '../types/media';

// mediaResolver.ts와 역할을 나눈 이유: mediaResolver는 "public 폴더에 파일이 실제로 있는지"만
// 확인하는 파일시스템 유틸이고, 이 파일(mediaDisplay.ts)은 "그 결과를 어떻게 보여줄지"
// (fit/position/aspectRatio 기본값 채우기, Tailwind 클래스 조합)만 담당한다.
// 관심사를 나눠두면 섹션이 늘어나도 각자 독립적으로 재사용/테스트할 수 있다.

export interface NormalizeMediaOptions {
  defaultFit?: MediaFit;
  defaultPosition?: string;
  defaultAlt?: string;
  defaultAspectRatio?: MediaAspectRatio;
  defaultBackgroundColor?: string;
  baseDir?: string;
}

const DEFAULT_FIT: MediaFit = 'cover';
const DEFAULT_POSITION = 'center';
const DEFAULT_ASPECT_RATIO: MediaAspectRatio = 'auto';
const DEFAULT_BACKGROUND_COLOR = 'bg-neutral-800';

// media input(문자열 또는 객체) 하나를 공통 형태(ResolvedMediaItem)로 정규화한다.
// - 문자열형: "/clients/.../hero-01"처럼 빠른 config 작성을 위한 호환 방식이다. { src: 문자열 }로
//   취급하고 fit/position 등 나머지는 모두 옵션 기본값을 쓴다.
// - 객체형: alt/fit/position/aspectRatio를 세밀하게 제어하기 위한 확장 방식이다. 채워진 필드만
//   쓰고 나머지는 기본값과 병합한다.
// mediaResolver.resolveMediaPath로 실제 public 파일이 있는지 확인하고,
// 없으면 null을 반환해서 호출부(HeroMedia01 등)가 fallback 배경을 쓰도록 유도한다.
export function normalizeMediaItem(
  input: MediaItemInput,
  options: NormalizeMediaOptions = {},
): ResolvedMediaItem | null {
  const raw: MediaItemObject = typeof input === 'string' ? { src: input } : input;

  const resolvedSrc = resolveMediaPath(raw.src, options.baseDir);
  if (!resolvedSrc) {
    // 실제 파일을 찾지 못했다 -> null을 반환해 호출부가 fallback 배경을 쓰게 한다.
    return null;
  }

  const position = raw.position ?? options.defaultPosition ?? DEFAULT_POSITION;

  return {
    src: resolvedSrc,
    alt: raw.alt ?? options.defaultAlt ?? '',
    fit: raw.fit ?? options.defaultFit ?? DEFAULT_FIT,
    position,
    // mobilePosition을 따로 안 정했으면 position 값을 그대로 재사용한다.
    mobilePosition: raw.mobilePosition ?? position,
    aspectRatio: raw.aspectRatio ?? options.defaultAspectRatio ?? DEFAULT_ASPECT_RATIO,
    backgroundColor: raw.backgroundColor ?? options.defaultBackgroundColor ?? DEFAULT_BACKGROUND_COLOR,
  };
}

// media 배열 전체를 정규화한다. 실제 파일이 없는 항목(null)은 걸러낸다.
export function normalizeMediaList(
  inputs: MediaItemInput[],
  options: NormalizeMediaOptions = {},
): ResolvedMediaItem[] {
  return inputs
    .map((input) => normalizeMediaItem(input, options))
    .filter((item): item is ResolvedMediaItem => item !== null);
}

// fit 값을 Tailwind object-fit 클래스로 바꾼다. 값이 cover/contain 둘뿐이라 안전한 리터럴 매핑이다.
const FIT_CLASS: Record<MediaFit, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
};

export function getObjectFitClass(resolved: ResolvedMediaItem): string {
  return FIT_CLASS[resolved.fit];
}

// object-position 후보 lookup map이다. Tailwind는 소스에 리터럴로 존재하는 클래스만 인식하므로
// position 값을 그대로 클래스 이름에 꽂지 않고, 이 목록을 거쳐서만 변환한다.
// 목록에 없는 값이 들어오면 안전하게 'object-center'로 대체한다.
const POSITION_CLASS: Record<string, string> = {
  center: 'object-center',
  top: 'object-top',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
  'left-top': 'object-left-top',
  'left-bottom': 'object-left-bottom',
  'right-top': 'object-right-top',
  'right-bottom': 'object-right-bottom',
};

// 지금은 position 값 하나만 클래스로 변환한다(모바일/PC 공통 적용).
// 확장 포인트: 나중에 모바일과 PC의 초점을 다르게 쓰고 싶으면, 이 함수를 mobilePosition까지
// 받아서 `${모바일 position 클래스} md:${데스크톱 position 클래스}` 형태로 반환하도록 넓히면 된다.
export function getObjectPositionClass(resolved: ResolvedMediaItem): string {
  return POSITION_CLASS[resolved.position] ?? POSITION_CLASS.center;
}

// aspectRatio preset -> 실제 Tailwind 클래스 lookup map이다.
// 자유 문자열이 아니라 이름 있는 preset만 허용하는 이유는 media.ts의 MediaAspectRatio 주석과 동일하다
// (Tailwind가 동적으로 완성되는 임의값 클래스를 인식하지 못하는 문제를 피하기 위함).
const ASPECT_RATIO_CLASS: Record<MediaAspectRatio, string> = {
  auto: '',
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  wide: 'aspect-[16/9]',
};

export function getAspectRatioClass(resolved: ResolvedMediaItem): string {
  return ASPECT_RATIO_CLASS[resolved.aspectRatio];
}
