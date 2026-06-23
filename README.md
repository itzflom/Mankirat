# Mankirat Dethroning Revolution

A satirical "official recruitment portal" for the running joke that our friend **Mankirat**
is the dictator of the Raffles friend group. Citizens are invited to apply for one of seven
positions in the Provisional Revolutionary Command.

This is a static site — plain HTML, CSS, and JavaScript, no build step or dependencies.

## Viewing it on GitHub (GitHub Pages)

1. Go to the repository on GitHub: **Settings → Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Choose this branch (`claude/mankirat-revolution-site-kca4p1`, or `main` once merged) and the
   `/ (root)` folder, then save.
4. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/` within a
   minute or two.

## Running it locally

No build tools needed — just open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.

## How applying works

Each role's **Apply** button opens a popup with both organiser email addresses
(`27singhk@bsj.sch.id` and `eshan030709@gmail.com`). From there you can either:

- Click **Open Email Application** to launch a prefilled email (subject + body) addressed to
  both organisers, or
- Click **Copy Email Addresses** to copy both addresses to your clipboard if you'd rather
  compose the email yourself.
