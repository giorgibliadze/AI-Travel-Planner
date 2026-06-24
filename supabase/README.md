# TripNova Supabase Setup

## Run `schema.sql`

1. Open your Supabase project dashboard.
2. Go to **SQL Editor**.
3. Create a new query.
4. Paste the contents of `supabase/schema.sql`.
5. Run the query.

The script creates `profiles`, `trips`, and `subscriptions`, enables RLS, adds policies, creates indexes, and adds the `auth.users` trigger that creates a free profile for every new user.

## Environment Variables

Add these values locally in `.env.local` and in Vercel project settings:

```bash
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Only the `NEXT_PUBLIC_` keys are exposed to the browser. Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.

## Google OAuth

1. In Supabase, go to **Authentication > Providers > Google**.
2. Enable Google.
3. Add your Google OAuth client ID and client secret.
4. In Google Cloud Console, add the Supabase callback URL from the Google provider screen.
5. In Supabase **Authentication > URL Configuration**, add your local and production site URLs.

Typical local URL:

```text
http://localhost:3000
```

## Email Confirmation During Local Testing

Supabase may block email/password login until the user confirms their email.

For local testing, go to **Supabase > Authentication > Sign In / Providers > Email** and either:

- Disable **Confirm email**, or
- Confirm the test user manually in **Authentication > Users**.

## Admin Email

Admin access is controlled by an email whitelist in `app/api/admin/summary/route.ts`:

```ts
const ADMIN_EMAILS = ["bliadze1997@gmail.com"];
```

Add or remove emails there before deploying.

## Deploy To Vercel

1. Push the repository to GitHub.
2. Import it in Vercel.
3. Add all environment variables listed above.
4. Set the production URL in Supabase **Authentication > URL Configuration**.
5. Run `supabase/schema.sql` in the production Supabase project.
6. Deploy.
