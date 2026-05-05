# Chill Path — Cloudflare Pages + Supabase MVP

Dette er en Chillio-inspirert, men ikke-kopiert, selvhjelps-/vanebyggingsapp. Den er laget som et lite webprodukt med:

- Supabase Auth for innlogging/registrering
- Supabase Postgres for brukerdata
- Row Level Security, slik at hver bruker kun får tilgang til egne data
- Cloudflare Pages som frontend-hosting
- Vite + React som frontend
- Startkartlegging som velger programspor
- Fire 28-dagers programspor:
  - Kom i gang rolig
  - Fokus og struktur
  - Ferdig er bedre enn perfekt
  - Slutt å utsette
- Korte daglige økter med refleksjon/quiz
- Daglig innsjekk for humør, energi og fokus
- Journalspørsmål som tilpasses programsporet
- Vaner og daglig vanelogging
- Dagens plan med første steg, starttid, hindring og hvis-så-plan
- Parkeringsliste for distraksjoner og løse oppgaver
- Ukentlig oversikt, enkel mønsteroversikt og ukentlig gjennomgang
- Mild start-igjen-flyt når brukeren har vært borte noen dager
- Rekke/fremgang
- Vedlikeholdsmodus etter fullført program

Appen er ikke ment som medisinsk rådgivning, diagnostikk eller behandling.

## Viktig ved oppdatering fra forrige versjon

Denne versjonen legger til tre nye Supabase-tabeller:

- `daily_plans`
- `parking_items`
- `weekly_reviews`

Hvis du allerede har kjørt en eldre versjon av `supabase/schema.sql`, trenger du bare å kjøre `supabase/upgrade_oversikt.sql` én gang i Supabase SQL Editor. Hvis du lager et helt nytt Supabase-prosjekt, kan du kjøre hele `supabase/schema.sql`.

Programinnholdet er fortsatt fire ulike 28-dagersspor. Eksisterende journal, vaner, innsjekker og leksjonsfremgang beholdes. Nye oversiktsfunksjoner begynner å samle data fra den dagen brukeren tar dem i bruk.

## 1. Opprett Supabase-prosjekt

1. Gå til Supabase og lag et nytt prosjekt.
2. Gå til **SQL Editor**.
3. Kjør hele filen `supabase/schema.sql`.
4. Gå til **Project Settings → API**.
5. Kopier:
   - Project URL
   - anon/public key

## 2. Kjør lokalt

```bash
npm install
cp .env.example .env
```

Fyll inn `.env`:

```bash
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-SUPABASE-ANON-KEY
```

Start lokalt:

```bash
npm run dev
```

## 3. Deploy på Cloudflare Pages

1. Lag et GitHub-repo og push filene.
2. Gå til **Cloudflare → Workers & Pages → Create → Pages**.
3. Koble til GitHub-repoet.
4. Velg:
   - Framework preset: `Vite` eller `React (Vite)`
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Legg inn miljøvariabler under **Settings → Environment variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy.

`public/_redirects` sørger for at direkte lenker i SPA-en fungerer.

## 4. Supabase Auth-innstillinger

For enkel testing kan du bruke e-post/passord.

I Supabase kan du justere:

- **Authentication → Providers → Email**
- Om e-postbekreftelse skal være på eller av
- Site URL, for eksempel `https://din-side.pages.dev`
- Redirect URLs, for eksempel `https://din-side.pages.dev/*`

## 5. Database-tabeller

SQL-filen lager disse tabellene:

- `profiles`
- `onboarding_answers`
- `user_progress`
- `lesson_completions`
- `daily_checkins`
- `journal_entries`
- `habits`
- `habit_logs`
- `daily_plans`
- `parking_items`
- `weekly_reviews`

Alle tabeller har Row Level Security aktivert.

## 6. Videreutvikling som passer godt

Mulige neste steg:

- Adminside for å redigere leksjoner i Supabase i stedet for hardkodet innhold i `lessonData.js`
- Betaling med Stripe eller Lemon Squeezy
- E-postpåminnelser med Supabase Edge Functions eller Cloudflare Workers Cron Triggers
- Mer avansert personalisering, for eksempel sekundærspor og adaptive dagsoppgaver
- Graf over humør/energi/fokus over tid
- Eksport av journal til CSV/PDF
- PWA-støtte slik at den kan installeres på mobilhjemskjermen

## 7. Viktige filer

```text
src/main.jsx              App, sider, Supabase-kall og navigasjon
src/lessonData.js         28-dagers programspor og personaliseringslogikk
src/styles.css            Design
src/supabaseClient.js     Supabase-klient
supabase/schema.sql       Database og RLS
supabase/upgrade_oversikt.sql  Migrering for eksisterende Supabase-prosjekt
public/_redirects         Cloudflare Pages SPA fallback
```
