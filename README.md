# Portfolio React — Vite + React Router

Portfolio personal **Ibnu Akil** — migrasi dari Astro ke **Vite + React Router + Tailwind 4**, dengan particle effect, Lottie, dan Supabase Storage.

Live: `https://ibnuakill.vercel.app` (Vercel)

## Fitur

- **Hero** — `WEB DEVELOPER` Effra Heavy + Lottie `public/lottie/code-dark.lottie` (hijau #068e75)
- **About Me** — di bawah hero, foto particle `public/bg-profile.png` (lingkaran → kotak rounded 2.8rem, `scale 9`)
- **Project & Certificate** — 1 section tab geser (pill Project | Certificate)
- **Keahlian** — 17 stacks (Frontend/Backend/Language/DB/Styling/Tools/DevOps)

## Stack

Vite 8, React 19, React Router 7, Tailwind 4 + `@tailwindcss/vite` + `@tailwindcss/typography`, framer-motion, AOS, `@lottiefiles/dotlottie-react`, `@supabase/supabase-js`

## Setup

```bash
npm install
cp .env.example .env # isi VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
npm run dev    # http://localhost:5173
npm run build
npm run preview
```

## Struktur

```
src/
  components/ Header, Footer, ProjectCard, WelcomeScreen, V5Background, CodeLottie, AboutParticle, originkit/svgparticles
  pages/ Home (hero+about+projects/certificates+skills), Projects, Contact, Admin
  data/ site, hero, skills, certificates, social
  lib/ supabase.ts
  styles/ global.css (Effra Heavy, Pure Dance Sans)
public/
  fonts/pure-dance-sans.ttf, bg-profile.png, profile-cut.png, lottie/code-dark.lottie
```

## Deploy

`vercel.json` SPA rewrite → Vercel auto. Push ke `master` → deploy.
