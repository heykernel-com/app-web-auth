import sharedConfig from "@zitadel/tailwind-config/tailwind.config.mjs";

let colors = {
  background: { light: { contrast: {} }, dark: { contrast: {} } },
  primary: { light: { contrast: {} }, dark: { contrast: {} } },
  warn: { light: { contrast: {} }, dark: { contrast: {} } },
  text: { light: { contrast: {} }, dark: { contrast: {} } },
  link: { light: { contrast: {} }, dark: { contrast: {} } },
};

const shades = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];
const themes = ["light", "dark"];
const types = ["background", "primary", "warn", "text", "link"];
types.forEach((type) => {
  themes.forEach((theme) => {
    shades.forEach((shade) => {
      colors[type][theme][shade] = `var(--theme-${theme}-${type}-${shade})`;
      colors[type][theme][`contrast-${shade}`] =
        `var(--theme-${theme}-${type}-contrast-${shade})`;
      colors[type][theme][`secondary-${shade}`] =
        `var(--theme-${theme}-${type}-secondary-${shade})`;
    });
  });
});

/** @type {import('tailwindcss').Config} */
export default {
  presets: [sharedConfig],
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        ...colors,
        state: {
          success: {
            light: {
              background: "#cbf4c9",
              color: "#0e6245",
            },
            dark: {
              background: "#68cf8340",
              color: "#cbf4c9",
            },
          },
          error: {
            light: {
              background: "#ffc1c1",
              color: "#620e0e",
            },
            dark: {
              background: "#af455359",
              color: "#ffc1c1",
            },
          },
          neutral: {
            light: {
              background: "#e4e7e4",
              color: "#000000",
            },
            dark: {
              background: "#1a253c",
              color: "#ffffff",
            },
          },
          alert: {
            light: {
              background: "#fbbf24",
              color: "#92400e",
            },
            dark: {
              background: "#92400e50",
              color: "#fbbf24",
            },
          },
        },
        primary: {
          DEFAULT: "rgb(var(--color-primary))",
          foreground: "rgb(var(--color-primary-foreground))",
        },
        input: {
          DEFAULT: "rgb(var(--color-input))",
        },
        background: {
          DEFAULT: "rgb(var(--color-background))",
        },
        foreground: {
          DEFAULT: "rgb(var(--color-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--color-card))",
          foreground: "rgb(var(--color-card-foreground))",
        },
        popover: {
          DEFAULT: "rgb(var(--color-popover))",
          foreground: "rgb(var(--color-popover-foreground))",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary))",
          foreground: "rgb(var(--color-secondary-foreground))",
        },
        muted: {
          DEFAULT: "rgb(var(--color-muted))",
          foreground: "rgb(var(--color-muted-foreground))",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent))",
          foreground: "rgb(var(--color-accent-foreground))",
        },
        destructive: {
          DEFAULT: "rgb(var(--color-destructive))",
          foreground: "rgb(var(--color-destructive-foreground))",
        },
        border: {
          DEFAULT: "rgb(var(--color-border))",
        },
        ring: {
          DEFAULT: "rgb(var(--color-ring))",
        },
        chart: {
          1: "rgb(var(--color-chart-1))",
          2: "rgb(var(--color-chart-2))",
          3: "rgb(var(--color-chart-3))",
          4: "rgb(var(--color-chart-4))",
          5: "rgb(var(--color-chart-5))",
        },
        sidebar: {
          DEFAULT: "rgb(var(--color-sidebar))",
          foreground: "rgb(var(--color-sidebar-foreground))",
          primary: {
            DEFAULT: "rgb(var(--color-sidebar-primary))",
            foreground: "rgb(var(--color-sidebar-primary-foreground))",
          },
          accent: {
            DEFAULT: "rgb(var(--color-sidebar-accent))",
            foreground: "rgb(var(--color-sidebar-accent-foreground))",
          },
          border: {
            DEFAULT: "rgb(var(--color-sidebar-border))",
          },
          ring: {
            DEFAULT: "rgb(var(--color-sidebar-ring))",
          },
        },
      },
      animation: {
        shake: "shake .8s cubic-bezier(.36,.07,.19,.97) both;",
      },
      keyframes: {
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },

          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },

          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },

          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
