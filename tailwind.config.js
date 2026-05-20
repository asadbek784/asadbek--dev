/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#060608',
        'bg-2':     '#0c0c12',
        acid:       '#b8ff3c',
        indigo:     '#6c6cff',
        rose:       '#ff4d6d',
        amber:      '#ffab00',
        'text-1':   '#f0f0f8',
        'text-2':   '#8888a8',
        'text-3':   '#505068',
        // Legacy aliases so old sed-replaced classes still compile
        'neon-cyan':    '#b8ff3c',
        'neon-purple':  '#6c6cff',
        'neon-pink':    '#ff4d6d',
        'text-primary': '#f0f0f8',
        'text-secondary':'#8888a8',
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body:    ['"Cabinet Grotesk"', 'sans-serif'],
        mono:    ['"Instrument Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
