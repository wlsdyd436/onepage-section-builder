// dist/index.html을 검사해서 href="#target" 내부 앵커 링크가 실제 존재하는
// id="target"을 가리키는지, 그리고 id 값이 중복되지 않는지 확인하는 QA 스크립트다.
// npx astro build 이후 npm run validate:anchors로 실행한다.
//
// /showroom은 여러 preview 섹션을 쌓아 렌더링하는 전시장이라 같은 컴포넌트가
// 반복되면서 id가 의도적으로 겹칠 수 있어, 이번 단계에서는 실제 고객 데모 페이지인
// dist/index.html만 검사한다.

import { readFile } from "node:fs/promises";
import path from "node:path";

const distIndexPath = path.join(process.cwd(), "dist", "index.html");

async function main() {
  let html;
  try {
    html = await readFile(distIndexPath, "utf-8");
  } catch {
    console.error("dist/index.html을 찾을 수 없습니다. 먼저 npx astro build를 실행하세요.");
    process.exit(1);
    return;
  }

  // HTML 주석 안에 설명 목적으로 id="..."/href="#..." 같은 문자열이 그대로 적혀 있는
  // 경우가 있어(예: StickyMobileCTA01.astro), 주석을 먼저 제거하지 않으면 실제 DOM에
  // 존재하지 않는 값이 검사 대상에 섞여 거짓 실패(false positive)가 발생한다.
  const withoutComments = html.replace(/<!--[\s\S]*?-->/g, "");

  const ids = [...withoutComments.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const hrefTargets = [...withoutComments.matchAll(/\shref="#([^"]+)"/g)]
    .map((m) => m[1])
    .filter((target) => target.length > 0); // href="#"만 있는 빈 target은 검사 대상에서 제외한다.

  const idSet = new Set(ids);
  const idCounts = new Map();
  for (const id of ids) {
    idCounts.set(id, (idCounts.get(id) ?? 0) + 1);
  }
  const duplicateIds = [...idCounts.entries()]
    .filter(([, count]) => count > 1)
    .map(([id]) => id);

  const missingTargets = [...new Set(hrefTargets)].filter((target) => !idSet.has(target));

  const relativePath = path.relative(process.cwd(), distIndexPath).replace(/\\/g, "/");

  if (missingTargets.length > 0 || duplicateIds.length > 0) {
    console.error("Anchor validation failed.");
    if (missingTargets.length > 0) {
      console.error("Missing targets:");
      for (const target of missingTargets) {
        console.error(`- #${target}`);
      }
    }
    if (duplicateIds.length > 0) {
      console.error("Duplicate ids:");
      for (const id of duplicateIds) {
        console.error(`- ${id}`);
      }
    }
    process.exit(1);
    return;
  }

  console.log("Anchor validation passed.");
  console.log(`Checked file: ${relativePath}`);
  console.log(`Internal links: ${hrefTargets.length}`);
  console.log(`Unique ids: ${idSet.size}`);
  process.exit(0);
}

main();
