import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        abismo:  '#04101F',
        marino:  '#0A1B33',
        marino2: '#102544',
        senal:   '#3E7BD1',
        claro:   '#8FB8EE',
        hielo:   '#7FB0F5',
        luz:     '#FFFFFF',
        tenue:   '#8CA3C4',
        cuerpo:  '#C6D6EC',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: { medida: '68ch' },
    },
  },
  plugins: [],
} satisfies Config;
