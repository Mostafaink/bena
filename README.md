# bena

Bena MVP — Next.js + Supabase

## Stack

- **Frontend**: [Next.js 15](https://nextjs.org) (App Router, TypeScript, Tailwind CSS)
- **Database**: [Supabase](https://supabase.com) (hosted Postgres, REST API, auth)

## Getting Started

### 1. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **Project Settings → API** and copy your **Project URL** and **anon public key**

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in your values in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### 3. Install dependencies and run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/          # Next.js App Router pages
  lib/
    supabaseClient.ts   # Supabase client singleton
```

## Using the Database

Import the shared Supabase client anywhere in your app:

```ts
import { getSupabaseClient } from '@/lib/supabaseClient';
const supabase = getSupabaseClient();

const { data, error } = await supabase.from('your_table').select('*');
```

## Deploy

The easiest way to deploy is [Vercel](https://vercel.com). Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables in the Vercel project settings.
