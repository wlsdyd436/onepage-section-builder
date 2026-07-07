import fs from 'node:fs';
import path from 'node:path';

// 지원하는 이미지 확장자 목록이다. 이 순서대로 탐색해서 가장 먼저 존재하는 파일을 사용한다.
const SUPPORTED_EXTENSIONS = ['avif', 'webp', 'jpg', 'jpeg', 'png'] as const;

// 경로 끝에 .jpg, .png 같은 확장자가 이미 붙어 있는지 판별하는 패턴이다.
const EXTENSION_PATTERN = /\.[a-zA-Z0-9]+$/;

// public 폴더(baseDir) 기준으로 해당 경로에 실제 파일이 존재하는지 확인한다.
// public 경로(브라우저 URL, 예: /clients/interior-sample/hero-01.jpg)를
// 디스크 경로(예: <project>/public/clients/interior-sample/hero-01.jpg)로 바꿔서 fs로 확인한다.
function existsInPublic(publicPath: string, baseDir: string): boolean {
  const absolutePath = path.join(process.cwd(), baseDir, publicPath);
  return fs.existsSync(absolutePath);
}

// 이미지 경로 하나를 실제 존재하는 public URL로 변환한다.
// baseDir 기본값은 'public'이며, 테스트 시에만 다른 디렉터리를 넘겨 로직을 검증할 수 있게 열어둔다.
export function resolveMediaPath(mediaPath: string, baseDir = 'public'): string | null {
  // 확장자가 이미 있는 경로면 그 파일이 실제로 있는지만 확인한다.
  if (EXTENSION_PATTERN.test(mediaPath)) {
    return existsInPublic(mediaPath, baseDir) ? mediaPath : null;
  }

  // 확장자가 없는 경로면 지원 확장자를 우선순위대로 붙여가며 실제 존재하는 파일을 찾는다.
  for (const ext of SUPPORTED_EXTENSIONS) {
    const candidate = `${mediaPath}.${ext}`;
    if (existsInPublic(candidate, baseDir)) {
      return candidate;
    }
  }

  // 어떤 확장자로도 파일을 찾지 못하면 null을 반환한다.
  // 호출부(HeroMedia01)는 이 값을 걸러내고 fallback 배경을 사용하게 된다.
  return null;
}

// media 배열 전체를 처리해서 실제 존재하는 파일 경로만 남긴다.
export function resolveMediaList(mediaList: string[], baseDir = 'public'): string[] {
  return mediaList
    .map((mediaPath) => resolveMediaPath(mediaPath, baseDir))
    .filter((resolved): resolved is string => resolved !== null);
}

// 확장 포인트: 나중에는 경로 하나하나를 확인하는 대신 폴더 전체를 스캔해서
// hero-01, hero-02...처럼 번호가 이어지는 파일을 자동으로 모두 찾아주는 기능으로 넓힐 수 있다.
