# Setup guide: from laptop to live website

Do these in order. ⏱️ About 45 minutes total. Steps marked **🤖 Claude** are ones Claude does for you.

---

## 1. GitHub: create the repository (2 min)

1. On https://github.com, click **+** (top right) → **New repository**.
2. Name: `chameleon`. Choose **Private**.
3. **Do NOT** check "Add a README", .gitignore, or license. Claude already created the project, so the repo must start empty.
4. Click **Create repository** and copy the URL it shows (like `https://github.com/YOURNAME/chameleon.git`).
5. Skip the GitHub Desktop "clone" step from the class guide. The folder already exists at `C:\Users\lucas\coding-projects\chameleon`.

**🤖 Claude:** connects the folder to your repo and pushes. The first push opens a browser window asking you to sign in to GitHub. Approve it.

> Want to use GitHub Desktop later? **File → Add local repository** → pick `C:\Users\lucas\coding-projects\chameleon`.

---

## 2. Supabase: database + sign-in (10 min)

1. Go to https://supabase.com → **Start your project** → sign in with GitHub.
2. **New project**: name `chameleon`, choose a region near you (e.g. East US). Click **Generate a password** and save it in your password manager (you won't need it in the app). Click **Create**, then wait about 2 minutes.
3. **Create the table:** left sidebar → **SQL Editor** → **New query**. Paste everything in `supabase/schema.sql` → **Run**. You should see "Success. No rows returned."
4. **Get your keys:** left sidebar → **Project Settings** (gear) → **API Keys** (and **Data API** for the URL). You need:
   - **Project URL**, like `https://abcdefgh.supabase.co`
   - **Publishable key**, starting with `sb_publishable_` (or the legacy **anon public** key)

   These two are safe to share with Claude. They're designed to be public, and the database rules protect the data.
   ⚠️ **Never** share the **secret** / **service_role** key.
5. **Allowed sign-in redirects:** **Authentication** → **URL Configuration**:
   - **Site URL:** `http://localhost:3000` for now (you'll change it to your domain in step 5)
   - **Redirect URLs** → add each of these:
     - `http://localhost:3000/**`
     - `https://*.vercel.app/**`

The email magic link works out of the box. Supabase's built-in email service is limited to a few emails per hour, which is fine for a demo.

**🤖 Claude:** puts the URL and key in `.env.local` and tests real sign-in locally.

---

## 3. Google sign-in (10 min)

1. Go to https://console.cloud.google.com → project dropdown (top left) → **New project** → name `chameleon` → **Create**, then select it.
2. Search for **"Google Auth Platform"** (or **APIs & Services → OAuth consent screen**) → **Get started**:
   - App name: `Chameleon`. Support email: yours.
   - Audience: **External**.
   - Contact email: yours → **Create**.
3. **Clients** → **Create client**:
   - Application type: **Web application**
   - **Authorized redirect URIs** → add `https://YOUR-PROJECT.supabase.co/auth/v1/callback` (use your Supabase Project URL + `/auth/v1/callback`)
   - **Create**, then copy the **Client ID** and **Client secret**.
4. **Audience** → **Publish app** so anyone (not just test users) can sign in. Basic sign-in (email and profile) doesn't need Google's review.
5. Back in Supabase: **Authentication** → **Sign In / Providers** → **Google** → enable → paste the Client ID and Client secret → **Save**.

The Google client secret goes **only** into Supabase. Don't paste it in chat.

---

## 4. Vercel: put it on the internet (5 min)

1. https://vercel.com → sign up **with GitHub** (Hobby plan).
2. **Add New… → Project** → **Import** `chameleon`. If you don't see it, click **Adjust GitHub App Permissions** and give Vercel access to the repo.
3. Before clicking Deploy, open **Environment Variables** and add:
   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Project URL |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | your publishable key |
4. Click **Deploy**. About a minute later you get a URL like `chameleon-xyz.vercel.app`. 🎉

From now on, every push to `main` updates the site automatically.

---

## 5. Your own domain (10 min plus DNS wait)

1. Buy a domain at https://www.dynadot.com (about $11). Ideas: `projectchameleon.app`, `chameleon-students.com`, `hellochameleon.com`.
2. In Vercel: your project → **Settings → Domains** → add `yourdomain.com` (and accept adding `www.yourdomain.com` too).
3. Vercel then shows the DNS records it needs, usually:
   | Type | Host | Value |
   |---|---|---|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

   **Use the exact values Vercel shows you**, since they sometimes differ.
4. In Dynadot: **My Domains → Manage Domains** → your domain → **DNS Settings** → choose **Dynadot DNS** → enter those records → **Save**.
5. Wait 5–60 minutes. Vercel's Domains page turns green ✅ and adds HTTPS automatically.
6. Back in Supabase → **Authentication → URL Configuration**:
   - **Site URL:** `https://yourdomain.com`
   - **Redirect URLs:** add `https://yourdomain.com/**` and `https://www.yourdomain.com/**`

Then test both sign-in methods on the real domain, and submit the URL on Canvas. 🦎
