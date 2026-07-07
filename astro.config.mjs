// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Astro 전체 설정 파일이다.
// Tailwind CSS를 Vite 플러그인으로 연결해서 .astro 파일 안에서 Tailwind 클래스를 사용할 수 있게 한다.
export default defineConfig({
    vite: {
        plugins: [
            // Tailwind v4는 @tailwindcss/vite 플러그인을 통해 Astro와 연결한다.
            tailwindcss(),
        ],
    },
});