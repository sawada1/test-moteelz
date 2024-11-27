/** @type {import('tailwindcss').Config} */
const animate = require("tailwindcss-animate")

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts,js}"
  ],
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",
  theme: {
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'], // Add the family name you defined
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '999px',
      xl: '1200px',
      xxl: '1320px'
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9'
    },
    boxShadow: {
      'custom-all-sides':
        '0 4px 6px rgba(0, 0, 0, 0.1), 0 -4px 6px rgba(0, 0, 0, 0.1), 4px 0 6px rgba(0, 0, 0, 0.1), -4px 0 6px rgba(0, 0, 0, 0.1)',
      'customShadow': 'rgba(0, 0, 0, 0.1) 1px 4px 4px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      },
      screens: {
        lg: '1400px'
      }
    },
    extend: {
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: '#765cf1',
        primary_dark: '#312B72',
        bg_star: '#DDB163',
        // secondary: '#9fa6b3',
        dark: '#16171A',
        // accent: '#4f4f4f',
        light: '#ffffff',
        gray: '#212121',
        desc: '#EFF4F1',
        error: '#ff0000',
        green: '#177a1f',
        pink: '#ffc8e1',
        black1:"#382378",
        black2:"#2D3263",
        burgundy: '#ac0054',
        disabled: '#707070',
        bg_lightgray: '#DFDFDF',
        borderLightColor: "#F1F1F1",
        lightgreen_color: '#47BF39',
        lightgreen_hover_color: '#5CD452',
        acceptColor: "#50CD89",
        acceptBgColor: "#E8FFF3",
        rejectedColor: "#F1416C",
        rejectedBgColor: "#FFF5F8",
        waitingColor: "#F6C000",
        waitingBgColor: "#FFF8DD",
        lightPrimary: '#FFE4E6',
        textColor: '#3D3D3D',
        textLightGray: "#929292",
        primaryLight: '#F1EDFF',
        footerTextColor: "#545454",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // backgroundImage: {
      //   'custom-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 45.69%, #2C2C2C 116.5%)',
      // },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
      backgroundImage: {
        'terms-bg': "url('/img/header-terms.webp')",
        'policy-bg': "url('/public/img/policy.webp')",
        'about-bg': "url('/public/img/about-bg.webp')",
      }
    },

  },
  plugins: [animate],
}

