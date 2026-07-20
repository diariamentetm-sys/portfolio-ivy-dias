# Ivy Dias — Portfolio

Personal portfolio for Ivy Dias de Campos (CX Strategy · Service Design · User Research).

## Stack

- React 18 + Vite + TypeScript + Tailwind CSS
- i18n: English (default) + Portuguese
- Admin panel at `/admin`
- Supabase for editable site content and custom projects
- Deploy target: Vercel

## Local development

```bash
npm install
cp .env.example .env
# fill VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm run dev
```

## Admin

- URL: `/admin`
- Default password: `ivy-admin` (override with `VITE_ADMIN_PASSWORD`)

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview build
