/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        card: 'hsl(0 0% 100%)',
        ring: 'hsl(197 94% 50%)',
        input: 'hsl(240 5.9% 91%)',
        muted: 'hsl(240 4.8% 85.9%)',
        accent: 'hsl(197 94% 50%)',
        border: 'hsl(240 5.9% 91%)',
        radius: 'hsl(240 4.8% 85.9%)',
        popover: 'hsl(0 0% 100%)',
        primary: 'hsl(262 78% 56%)',
        secondary: 'hsl(240 4.8% 85.9%)',
        background: 'hsl(240 5% 96%)',
        foreground: 'hsl(240 45% 18%)',
        destructive: 'hsl(0 84% 44%)',
        'card-foreground': 'hsl(240 45% 18%)',
        'muted-foreground': 'hsl(240 45% 18%)',
        'accent-foreground': 'hsl(240 45% 18%)',
        'popover-foreground': 'hsl(240 45% 18%)',
        'secondary-foreground': 'hsl(240 45% 18%)',
        'destructive-foreground': 'hsl(0 84% 44%)',
      },
      borderRadius: {
        lg: '16px',
        md: '10px',
        sm: '6px',
      },
      spacing: {
        lg: '20px',
        md: '12px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 8px 24px hsla(0, 0%, 0%, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
