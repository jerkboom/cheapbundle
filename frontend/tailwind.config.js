/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#3B82F6",
        light: "#DBEAFE",
        accent: "#60A5FA",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        surfaceSecondary: "#F1F5F9",
        border: "#E2E8F0",
        textPrimary: "#0F172A",
        textSecondary: "#475569",
        textMuted: "#94A3B8",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#0EA5E9"
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
