import HeroMedia01 from '../components/sections/hero/HeroMedia01.astro';
import PortfolioGrid01 from '../components/sections/portfolio/PortfolioGrid01.astro';
import BeforeAfter01 from '../components/sections/before-after/BeforeAfter01.astro';
import Review01 from '../components/sections/review/Review01.astro';
import ProcessSteps01 from '../components/sections/process/ProcessSteps01.astro';
import FAQ01 from '../components/sections/faq/FAQ01.astro';
import ServiceCards01 from '../components/sections/service/ServiceCards01.astro';
import ContactCTA01 from '../components/sections/contact/ContactCTA01.astro';
import clientConfig from '../data/clients/interior-sample.json';

// sectionRegistry는 이 프로젝트에 존재하는 모든 섹션 컴포넌트를 한곳에서 관리하는 목록이다.
// 섹션이 30~40개, 나중에는 100개 이상으로 늘어날 예정이라, 새 섹션을 만들 때마다 여기에
// entry 하나씩 추가하는 것을 기준으로 삼는다. showroom.astro가 이 목록을 읽어서 실제 화면으로
// 렌더링해준다.
export interface SectionRegistryEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'ready' | 'draft' | 'planned';
  // Astro 컴포넌트 팩토리의 정확한 타입은 프로젝트 바깥에서 다루기 까다로운 내부 타입이라,
  // 여기서는 타입 정교함보다 단순함을 우선해 any로 둔다. 실제로는 showroom.astro에서
  // <Component {...previewProps} /> 형태로만 쓰인다.
  component?: any;
  previewProps?: Record<string, unknown>;
  notes?: string;
  // showroom에서 실제로 렌더링할지 여부다. Header01/StickyMobileCTA01처럼 페이지 전역
  // 레이아웃/고정 UI 성격의 컴포넌트는 false로 두고 목록에만 이름을 남긴다.
  showInShowroom?: boolean;
}

const { site, hero, portfolio, beforeAfter, reviews, process: processSteps, faq, services } = clientConfig;

export const sectionRegistry: SectionRegistryEntry[] = [
  {
    id: 'HeroMedia01',
    name: 'Hero - 미디어 배경 히어로',
    category: 'Hero',
    description: '배경 이미지/슬라이더 + 타이틀 + 설명 + CTA 버튼으로 구성된 첫 화면 히어로 섹션.',
    status: 'ready',
    component: HeroMedia01,
    // 실제 client config(interior-sample.json)의 hero 필드를 그대로 재사용해서
    // showroom에서도 실제 데모 페이지와 동일한 데이터로 미리보기를 보여준다.
    previewProps: {
      id: hero.id,
      type: hero.type,
      mediaType: hero.mediaType,
      title: hero.title,
      subtitle: hero.subtitle,
      description: hero.description,
      media: hero.media,
      buttons: hero.buttons,
      overlay: hero.overlay,
      autoplaySpeed: hero.autoplaySpeed,
    },
    showInShowroom: true,
  },
  {
    id: 'PortfolioGrid01',
    name: 'Portfolio - 시공 사례 그리드',
    category: 'Portfolio',
    description: '카테고리 배지 + 제목 + 위치/평수/스타일 + 설명으로 구성된 시공 사례 카드 그리드.',
    status: 'ready',
    component: PortfolioGrid01,
    previewProps: {
      title: portfolio.title,
      description: portfolio.description,
      items: portfolio.items,
    },
    showInShowroom: true,
  },
  {
    id: 'BeforeAfter01',
    name: 'Before-After - 시공 전후 비교',
    category: 'Before-After',
    description: '시공 전후 이미지를 카드 형태로 비교해 변화와 신뢰를 보여주는 섹션.',
    status: 'ready',
    component: BeforeAfter01,
    previewProps: {
      eyebrow: beforeAfter.eyebrow,
      title: beforeAfter.title,
      description: beforeAfter.description,
      items: beforeAfter.items,
    },
    showInShowroom: true,
  },
  {
    id: 'Review01',
    name: 'Review01 - 고객 후기 카드',
    category: 'Review',
    description: '고객 후기를 카드 형태로 보여줘 신뢰를 강화하는 섹션.',
    status: 'ready',
    component: Review01,
    previewProps: {
      eyebrow: reviews.eyebrow,
      title: reviews.title,
      description: reviews.description,
      items: reviews.items,
    },
    showInShowroom: true,
  },
  {
    id: 'ProcessSteps01',
    name: 'ProcessSteps01 - 진행 절차 카드',
    category: 'Process',
    description: '상담부터 시공 완료까지의 흐름을 단계별로 안내하는 섹션.',
    status: 'ready',
    component: ProcessSteps01,
    previewProps: {
      eyebrow: processSteps.eyebrow,
      title: processSteps.title,
      description: processSteps.description,
      items: processSteps.items,
    },
    showInShowroom: true,
  },
  {
    id: 'FAQ01',
    name: 'FAQ01 - 자주 묻는 질문',
    category: 'FAQ',
    description: '상담 전 자주 묻는 질문과 답변을 보여주는 섹션.',
    status: 'ready',
    component: FAQ01,
    previewProps: {
      eyebrow: faq.eyebrow,
      title: faq.title,
      description: faq.description,
      items: faq.items,
    },
    showInShowroom: true,
  },
  {
    id: 'ServiceCards01',
    name: 'ServiceCards01 - 서비스 소개 카드',
    category: 'Services',
    description: '제공 가능한 인테리어 서비스 범위를 카드 형태로 보여주는 섹션.',
    status: 'ready',
    component: ServiceCards01,
    previewProps: {
      eyebrow: services.eyebrow,
      title: services.title,
      description: services.description,
      items: services.items,
    },
    showInShowroom: true,
  },
  {
    id: 'ContactCTA01',
    name: 'Contact - 상담 CTA',
    category: 'Contact',
    description: '전화/카카오 상담 버튼과 업체 정보 카드로 구성된, 개인정보를 수집하지 않는 상담 섹션.',
    status: 'ready',
    component: ContactCTA01,
    previewProps: {
      businessName: site.businessName,
      phone: site.phone,
      kakaoUrl: site.kakaoUrl,
      address: site.address,
    },
    showInShowroom: true,
  },
  {
    id: 'Header01',
    name: 'Header - 반응형 헤더',
    category: 'Layout',
    description: '로고 + 내비게이션 + CTA + 모바일 햄버거 메뉴로 구성된 페이지 상단 헤더.',
    status: 'ready',
    notes:
      '페이지 전역 레이아웃 컴포넌트라 showroom 카드 안에 넣으면 오히려 혼란스럽다. 이번 MVP에서는 목록에만 이름을 남기고 실제 렌더링은 제외한다.',
    showInShowroom: false,
  },
  {
    id: 'StickyMobileCTA01',
    name: 'StickyMobileCTA - 모바일 하단 고정 CTA',
    category: 'Layout',
    description: '모바일 화면 하단에 고정되는 전화/상담 신청 CTA 바.',
    status: 'ready',
    notes:
      'position: fixed로 화면 하단에 고정되는 UI라, showroom처럼 여러 섹션을 위아래로 쌓아 보여주는 페이지에서 그대로 렌더링하면 다른 섹션들을 가리며 전시장 화면을 방해한다. 이번 MVP에서는 직접 렌더링하지 않는다.',
    showInShowroom: false,
  },
];
